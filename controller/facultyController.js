const connection = require("../connection");
const { v4: uuidv4 } = require("uuid");


function createFacultyHelper(newUser) {
    return new Promise((resolve, reject) => {
        let uid = newUser.uid;
        let name = newUser.name;
        let email = newUser.email;
        let phone = newUser.phone;
        let color = newUser.color;
        let sql = `INSERT INTO \`Faculty-Details\`(\`Name\`, \`Email\`, \`Phone\`, \`Color\` ,  \`uid\`) VALUES ("${name}","${email}","${phone}", "${color}","${uid}")`;
        connection.query(sql, function (error, data) {
            console.log(error,data);
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}
async function createFaculty(req, res) {
    try {
        let uid = uuidv4();
        let newUser = req.body;
        newUser.uid = uid;
        let data = await createFacultyHelper(newUser);
        res.json({
            message: "Faculty added succesfully",
            data: data,
        });
    } catch (err) {
        res.json({
            message: "Faculty creations failed !!",
            err: err,
        });
    }
};

function DeleteFacultyHelper(email) {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM \`Faculty-Details\` WHERE Email = "${email}" `;
        connection.query(sql, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}
async function DeleteFaculty(req, res) {
    try {
        let data = await DeleteFacultyHelper(req.body.email);
        res.json({
            message: "Faculty removed succesfully",
            data: data,
        });
    } catch (err) {
        res.json({
            message: "Faculty removal failed !!",
            data: err,
        });
    }
};

function getAllFacultyHelper() {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM \`Faculty-Details\``;
        connection.query(sql, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}
async function getAllFaculty(req, res) {
    try {
        let data = await getAllFacultyHelper();
        res.json({
            message: "succesfully get all faculty",
            data: data,
        });
    } catch (err) {
        res.json({
            message: "failed to get all faculty !!",
            data: err,
        });
    }
};


function getFacultyByIsHelper(email) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT \`Name\` , \`Color\`, \`Email\` FROM \`Faculty-Details\` WHERE Email = "${email}"`;
        // console.log(sql);
        connection.query(sql, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}
async function getFacultyById(req,res){
    try {
        // console.log(req.body);
        let data = await getFacultyByIsHelper(req.body.mail);
        res.json({
            message: "succesfully get faculty mail",
            data: data,
        });
    } catch (err) {
        res.json({
            message: "failed to get faculty mail !!",
            data: err,
        });
    }
}

function removeFacultyByIsHelper(email) {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM \`Faculty-Details\` WHERE Email = "${email}"`;
        connection.query(sql, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}
async function removeFacultyById(req,res){
    try {
        // console.log(req.body);
        let data = await removeFacultyByIsHelper(req.body.mail);
        res.json({
            message: "succesfully removed faculty mail",
            data: data,
        });
    } catch (err) {
        res.json({
            message: "failed to remove faculty mail !!",
            data: err,
        });
    }
}


module.exports.getAllFaculty = getAllFaculty
module.exports.createFaculty = createFaculty
module.exports.DeleteFaculty = DeleteFaculty
module.exports.getFacultyById = getFacultyById
module.exports.removeFacultyById = removeFacultyById;
