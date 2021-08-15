add_event_close_btn.addEventListener("click",function(){
    add_event_popup.style.display = "none"
})

add_event_btn.addEventListener("click",function(){
    add_event_popup.style.display = "block"
})

remove_faculty_cross.addEventListener("click",function(){
    remove_faculty_popup.style.display = "none"
})

remove_faculty_submit.addEventListener("click",async function(){
    try{

        let mail = remove_faculty_submit.getAttribute("email");
        let data = await axios.post("http://localhost:4000/faculty/remove",{email:mail});
        remove_faculty_popup.style.display = "none" ;
        set_faculty_list();
    }catch{
        alert("failed to remove faculty");
    }
})

remind_faculty_cross.addEventListener("click",function(){
    remind_faculty_popup.style.display = "none"
})
send_mail_close.addEventListener("click",function(){
    send_mail_popup.style.display = "none"
})

add_faculty_cross.addEventListener("click",function(){
    add_faculty_popup.style.display = "none"
})

faculty_add_btn.addEventListener("click",function(){
    add_faculty_popup.style.display = "block"
})

send_mail.addEventListener("click",function(){
    send_mail_popup.style.display = "block"
    three_dots_options_div.classList.remove("show-more")
})

reminder.addEventListener("click",function(){
    remind_faculty_popup.style.display = "block";
    three_dots_options_div.classList.remove("show-more")
})

three_dots.addEventListener("click",function(){
    if(three_dots_options_div.classList.contains("show-more")){
        three_dots_options_div.classList.remove("show-more")
        add_event_popup.style.display = "none"
    }else{
        add_event_popup.style.display = "none"
        three_dots_options_div.classList.add("show-more")
    }
})

left.addEventListener('click',function() {
    add_event_popup.style.display = "none"
    send_mail_popup.style.display = "none"
    remind_faculty_popup.style.display = "none"
})
header.addEventListener('click',function() {
    add_event_popup.style.display = "none"
    add_faculty_popup.style.display = "none"
    remove_faculty_popup.style.display= "none"
})

see_event_close_btn.addEventListener("click",function(){
    see_event_popup.style.display = "none"
})

remove_faculty_submit.addEventListener("click",function(){
    let mail = remove_faculty_popup.getAttribute("mail");
    axios.post("http://localhost:4000/faculty/del",{mail})
    remove_faculty_popup.style.display = "none";
    set_faculty_list();


})