const connection = require("../connection");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "cfsvoe;rvnwcruvnpiunvo903uf04wj";

function signupHelper(newUser) {
    return new Promise((resolve, reject) => {
        let name = newUser.name;
        let email = newUser.email;
        let pass = newUser.pass;
        let sql = `INSERT INTO \`Auth\`(\`Name\`, \`Email\`, \`Passsword\`) VALUES ("${name}","${email}","${pass}")`;
        connection.query(sql, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

async function signup(req, res) {
  try {
    let user = req.body;
    
    
    let newUser = await signupHelper(user)
   const token = jwt.sign({ mail:user.email }, SECRET_KEY);
    res.cookie("jwt", token, { httpOnly: true });

    res.status(201).json({
      message: "Succesfully Signed up !!",
      data: newUser,
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to sign up !!",
      error,
    });
  }
}

function loginHelper(email) {
    return new Promise((resolve, reject) => {
        
        let sql = `SELECT \`Passsword\` FROM \`Auth\` WHERE Email = "${email}"`;
        
        connection.query(sql, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

async function login(req, res) {
  try {
    let { email, password } = req.body;
    let loggedInUser = await loginHelper(email);
    
    if (loggedInUser.length) {
      let user = JSON.parse(JSON.stringify(loggedInUser[0]));
      if (user.Passsword == password) {
        const token = jwt.sign({ mail:email }, SECRET_KEY);
        res.cookie("jwt", token, { httpOnly: true });
        res.status(200).json({
          message: "Logged in succesfully !!",
          data: loggedInUser[0],
        });
       } else {
        res.status(200).json({
          err: "Email and Password didn't Matched !!",
        });
      }
    } else {
      res.status(200).json({
        err: "No User Found SignUp First",
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Login Failed !!",
      error,
    });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("jwt");
    res.redirect("/");
  } catch (error) {
    res.status(501).json({
      error,
    });
  }
}

async function isLoggedIn(req, res, next) {
  try {
    let token = req.cookies.jwt;
    const payload = jwt.verify(token, SECRET_KEY);
    if (payload) {
      req.mail = payload.mail;
      next();
    } else {
      next();
    }
  } catch (error) {
    next();
  }
}


module.exports.signup = signup;
module.exports.login = login;
module.exports.logout = logout;
module.exports.isLoggedIn = isLoggedIn;