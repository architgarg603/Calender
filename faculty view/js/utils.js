// days in month
let Days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let daylist = [ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var today = new Date();
let date = String(today.getDate()).padStart(2, '0');
date = Number(date)
let month = String(today.getMonth() + 1).padStart(2, '0');
month = Number(month) - 1
let yr = today.getFullYear();
yr = Number(yr)
let day = today.getDay();




// set toays date 
let set_todays_date = () => {
    today = new Date();
    date = String(today.getDate()).padStart(2, '0');
    date = Number(date)
    month = String(today.getMonth() + 1).padStart(2, '0');
    month = Number(month) - 1;
    yr = today.getFullYear();
    yr = Number(yr)
    day = today.getDay();
    nav_calender_head.innerHTML = monthNames[month] + " " + yr;
};

// set header date

let set_header_date = (date, month, yr) => {
    header_todays_date.innerHTML = ` ${date} ${monthNames[month]} ${yr}`
}

let set_nav_active_date = (div) => {
    let prev = nav_calender.querySelector(".active-nav-date");
    if (prev) prev.classList.remove('active-nav-date')
    div.classList.add('active-nav-date')
}

let set_nav_toady_active = () => {
    let t = new Date();
    let check_date = String(today.getDate()).padStart(2, '0');
    check_date = Number(check_date)
    check_month = String(today.getMonth() + 1).padStart(2, '0');
    check_month = Number(check_month) - 1;
    check_yr = today.getFullYear();
    let firstDay = Number((new Date(yr, month)).getDay());
    if (month == check_month && yr == check_yr) {
        nav_calender_date[check_date + firstDay -1].classList.add("active-nav-today-date");
    }else{
        let curr = nav_calender.querySelector(".active-nav-today-date");
        if(curr)curr.classList.remove("active-nav-today-date");
         
    }
}

set_todays_date();
set_header_date(date, month, yr);
set_nav_toady_active();