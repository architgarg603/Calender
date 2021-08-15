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
    window.location.href = "/d/login"
}

registerBtnHandler = () => {
    window.location.href = "/d/signup"
}

submitBtnHandler = async () => {
    if (email.value && pass.value) {
        let obj = await axios.post("https://horizoncenter.herokuapp.com/doctor/login", { email: email.value, password: pass.value });
        if (obj.data.data) {
            window.location.href = "/d/profile";
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
            let obj = await axios.post("https://horizoncenter.herokuapp.com/doctor/login", { email: email.value, password: pass.value });
            if (obj.data.data) {
                window.location.href = "/d/profile";
            } else {
                message.innerHTML = obj.data.message;
            }
        } else {
            message.innerHTML = "Add email and password";
        }
    }
}


