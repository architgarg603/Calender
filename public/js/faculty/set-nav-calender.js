todays_btn_wrapper.addEventListener("click", function () {
    set_todays_date();
    set_nav_calender(month, yr);
    set_nav_toady_active();
    getAllEvents()
    set_header_date(date, month, yr)
    set_yearly_calender_parts();
    set_weekly_calender_dat()
    set_monthly_calender_dates()

})

let set_nav_calender = async (month, yr) => {
    let firstDay = (new Date(yr, month)).getDay();
    let number_of_days = Days_in_month[month];

    for (let i = 0; i < nav_calender_date.length; i++) {
        nav_calender_date[i].innerHTML = '';
    }
    for (let i = 0; i < number_of_days; i++) {
        nav_calender_date[firstDay + i].innerHTML = i + 1;
    }

}
set_nav_calender(month, yr);

nav_calender_btns[0].addEventListener("click", function () {
    if (month - 1 < 0) {
        month = 11;
        yr = yr - 1;
    } else {
        month = month - 1;
    }
    nav_calender_head.innerHTML = monthNames[month] + " " + yr;
    set_nav_calender(month, yr);
    set_nav_toady_active();
    let prev = document.querySelector(".active-nav-date")
    if (prev) prev.classList.remove("active-nav-date")



})
nav_calender_btns[1].addEventListener("click", function () {
    if (month + 1 > 11) {
        month = 0;
        yr = yr + 1;
    } else {
        month = month + 1;
    }
    nav_calender_head.innerHTML = monthNames[month] + " " + yr;
    set_nav_calender(month, yr);
    set_nav_toady_active();
    let prev = document.querySelector(".active-nav-date")
    if (prev) prev.classList.remove("active-nav-date")

})

nav_calender_date.forEach(x => {
    x.addEventListener("click", function () {
        if (x.innerHTML != '') {
            date = Number(x.innerHTML)
            day = new Date(yr,month,date).getDay();

            set_header_date(date, month, yr)
            set_nav_active_date(x);
            getAllEvents()
            set_yearly_calender_parts();
            set_weekly_calender_dat()
            set_monthly_calender_dates()
        }
    })
})


