
send_mail_submit.addEventListener("click", async function () {
    let send_mail_faculty = document.querySelector("#send-mail-choose-faculty");
    let email = send_mail_faculty.value;
    let body = send_mail_body.value
    let subject = send_mail_subject.value;
    let data = await axios.post("http://localhost:4000/mail/to", { body, email, subject })
    send_mail_popup.style.display = "none"
})

remind_faculty_submit.addEventListener("click",async function(){
    let data = await axios.post("http://localhost:4000/mail/remind")
    remind_faculty_popup.style.display = "none"
    console.log(data)
})