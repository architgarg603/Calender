let inc_day = () => {
    let totalDays = Days_in_month[month];
    if (date + 1 > totalDays) {
        date = 1;
        inc_month();
        set_monthly_calender_dates()
        set_weekly_calender_dat()

    } else {
        date = date + 1;
        set_weekly_calender_dat()

    }
}
let dec_day = () => {
    let totalDays = Days_in_month[month - 1];
    if (date - 1 < 1) {
        date = totalDays;
        dec_month();
        set_monthly_calender_dates()
        set_weekly_calender_dat()

    } else {
        date = date - 1;
        set_weekly_calender_dat()

    }
}

let inc_month = () => {
    if (month + 1 > 11) {
        month = 0;
        yr = yr + 1;

        set_yearly_calender_parts();
        set_monthly_calender_dates()
        let prev = nav_calender.querySelector(".active-nav-date");
        if (prev) prev.classList.remove('active-nav-date')
    } else {
        month = month + 1;
        set_monthly_calender_dates()
    }
}

let dec_month = () => {
    if (month - 1 < 0) {
        month = 11;
        yr = yr - 1;
        set_yearly_calender_parts();
        set_monthly_calender_dates()
        let prev = nav_calender.querySelector(".active-nav-date");
        if (prev) prev.classList.remove('active-nav-date')

    } else {
        month = month - 1;
        set_monthly_calender_dates()
    }
}

let dec_yr = () => {
    yr = yr - 1;
    set_yearly_calender_parts();
}
let inc_yr = () => {
    yr = yr + 1;
    set_yearly_calender_parts();
}

let dec_week = () => {
    let totalDays = Days_in_month[month - 1];
    if (date - 7 < 1) {
        let rem = date - 7;
        date = totalDays + rem;
        dec_month();
        set_monthly_calender_dates()
        set_weekly_calender_dat()
    } else {
        date = date - 7;
        set_weekly_calender_dat()
    }
}

let inc_week = () => {
    let totalDays = Days_in_month[month];
    if (date + 7 > totalDays) {
        let rem = totalDays - date - 7;
        date = -rem;
        inc_month();
        set_monthly_calender_dates()
        set_weekly_calender_dat()
    } else {

        date = date + 7;
        set_weekly_calender_dat()

    }
}

shifters[0].addEventListener("click", function () {
    if (calender_type_changer.value == "Daily")
        dec_day();
    if (calender_type_changer.value == "Monthly")
        dec_month();
    if (calender_type_changer.value == "Weakly")
        dec_week();
    if (calender_type_changer.value == "Yearly")
        dec_yr();
    day = new Date(yr, month, date).getDay();
    getAllEvents()
    set_nav_calender(month, yr)
    set_nav_toady_active();
    set_header_date(date, month, yr)
    nav_calender_head.innerHTML = monthNames[month] + " " + yr;
    let prev = nav_calender.querySelector(".active-nav-date");
    if (prev) prev.classList.remove('active-nav-date')
    


})
shifters[1].addEventListener("click", function () {
    if (calender_type_changer.value == "Daily")
        inc_day();
    if (calender_type_changer.value == "Monthly")
        inc_month();
    if (calender_type_changer.value == "Weakly")
        inc_week();
    if (calender_type_changer.value == "Yearly")
        inc_yr();
    day = new Date(yr, month, date).getDay();
    getAllEvents()

    set_nav_calender(month, yr)
    set_nav_toady_active();
    set_header_date(date, month, yr)
    nav_calender_head.innerHTML = monthNames[month] + " " + yr;


})