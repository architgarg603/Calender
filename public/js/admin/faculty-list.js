faculty_seach_input.addEventListener("input", function (e) {
    let allFaculties = document.querySelectorAll(".faculty");
    let val = e.target.value;
    val = val.toLowerCase();
    for (let i = 0; i < allFaculties.length; i++) {
        let innerVal = allFaculties[i].querySelector("span").innerHTML.toLowerCase();;
        if (val == "") {
            allFaculties[i].style.display = "flex"
        } else if (innerVal.includes(val)) {
            allFaculties[i].style.display = "flex"
        } else {

            allFaculties[i].style.display = "none"
        }
    }
})

add_faculty_submit.addEventListener("click",async function(){
    let name = add_faculty_name.value;
    let ph = add_faculty_phone.value;
    let email = add_faculty_email.value;
    let color = add_faculty_color.value
console.log(name,email,ph);
    if (name && email && ph) {
        let data = await axios.post("http://localhost:4000/faculty/add", { "name": name, "email": email, "phone": ph, "color":color });
        console.log(data.data);
        add_faculty_popup.style.display = "none";
        add_faculty_msg.innerHTML = "";
        set_faculty_list();
        if(data.data.err)alert("faild to add faculty")
    } else {
        add_faculty_msg.innerHTML = "All fields are required"
    }
});