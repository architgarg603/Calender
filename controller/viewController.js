async function getHome(req,res){
    if(req.mail == "gargarchit603@gmail.com"){
        res.render("index.ejs");
    }
    if(req.mail){
        res.render("faculty.ejs",{mail:req.mail});
    }

    res.redirect("/login");
}
async function getLogin(req,res){
    if(req.mail){
        res.redirect("/");
    }
    res.render("login.ejs")
}
async function getRegister(req,res){
    if(req.mail){
        res.redirect("/");
    }
    res.render("register.ejs")
}





module.exports.getHome = getHome
module.exports.getLogin = getLogin
module.exports.getRegister = getRegister
