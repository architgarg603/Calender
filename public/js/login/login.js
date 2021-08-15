let email = document.querySelector("#Email");
let pass = document.querySelector("#Pwd");
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
    if (email.value && pass.value) {
        let obj = await axios.post("http://localhost:4000/user/login", { email: email.value, password: pass.value });
        console.log(obj)
        window.location.href = "/";
        if (obj.data.data) {
        } else {
            message.innerHTML = obj.data.message;
        }
    } else {
        message.innerHTML = "Add email and password";
    }
}

enterBtnHandler = async (e) => {
    if (e.key == "Enter") {
        if (email.value && pass.value) {
            let obj = await axios.post("http://localhost:4000/user/login", { email: email.value, password: pass.value });
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


