let name = document.querySelector("#name");
let email = document.querySelector("#Email");
let pass = document.querySelector("#Pwd");
let Cpass = document.querySelector("#CPwd");
let message = document.querySelector("#message");
let submitBtn = document.querySelector(".submit");
let registerBtn = document.querySelector(".register");
let loginBtn = document.querySelector(".login");


window.addEventListener("load", function () {
    submitBtn.addEventListener("click", submitBtnHandler);
    registerBtn.addEventListener("click", registerBtnHandler);
    loginBtn.addEventListener("click", loginBtnHandler);
    email.addEventListener("keypress", enterBtnHandler);
    pass.addEventListener("keypress", enterBtnHandler);
})

loginBtnHandler = () => {
    window.location.href = "/login"
}

registerBtnHandler = () => {
    window.location.href = "/register"
}

submitBtnHandler = async () => {
    console.log(pass.value == Cpass.value)
    if (email.value && pass.value && name.value && Cpass.value) {
        
        if (pass.value != Cpass.value) {
            message.innerHTML = "Password did not match"
            return
        }
        let obj = await axios.post("http://localhost:4000/user/register", {
            "name": name.value,
            "email": email.value,
            "pass": pass.value
        });
        if (obj.data.data) {
            window.location.href = "/";
        } else {
            message.innerHTML = obj.data.message;
        }
    } else {
        message.innerHTML = "Add email and password";
    }
}

enterBtnHandler = async (e) => {
    if (e.key == "Enter") {
        if (email.value && pass.value && name.value && Cpass.value) {
            if (pass.value == Cpass.value) {
                message.innerHTML = "Password did not match"
                return
            }
            let obj = await axios.post("http://localhost:4000/user/register", {
                "name": name.value,
                "email": email.value,
                "pass": pass.value
            });
            if (obj.data.data) {
                window.location.href = "/";
            } else {
                message.innerHTML = obj.data.message;
            }
        } else {
            message.innerHTML = "Add email and password";
        }
    }
}


