// header
let three_dots = document.querySelector(".three-dots i");
let three_dots_options_div = document.querySelector(".more-options");
let three_dots_options = document.querySelectorAll(".more-options div");
let calender_type_changer = document.querySelector("#Type-Changer");
let send_mail = document.querySelector(".send-mail");
let reminder = document.querySelector(".reminder");
let remind_faculty_submit = document.querySelector(".reminder-faculty-submit span")
let header_todays_date = document.querySelector(".todays-Date")
let shifters = document.querySelectorAll(".shifter i");
let header = document.querySelector(".header")
let logout = document.querySelector(".logout");

// left div
let left = document.querySelector(".left");
let todays_btn_wrapper = document.querySelector(".todays-btn-wrapper");
let nav_calender = document.querySelector(".nav-calender");
let nav_calender_head = document.querySelector(".nav-calender-month");
let nav_calender_btns = document.querySelectorAll(".nav-calender-head i");
let nav_calender_date = document.querySelectorAll(".nav-calender-dates span");
let faculty_list = document.querySelector(".faculty-list");
let faculty_add_btn = document.querySelector(".faculty-list-head i");
let faculty_seach_input = document.querySelector(".faculty-list-search input")


// right div
let right_div = document.querySelector(".right")
let daily_div = document.querySelector(".daily-calender");
let weekly_div = document.querySelector(".weekly-calender");
let weekly_days = document.querySelectorAll(".weekly-date");
let monthly_div = document.querySelector(".monthly-calender");
let monthly_dates = document.querySelectorAll(".monthly-date")
let yearly_div = document.querySelector(".yearly-calender");
let yearly_parts = document.querySelectorAll(".yearly-calender-dates");


// daily div
let daily_time = document.querySelector(".daily-time");
let daily_schedule = document.querySelectorAll(".daily-schedule")

// add event popup
let add_event_popup = document.querySelector(".add-event-popup")
let add_event_btn = document.querySelector(".add-event");
let add_event_close_btn = document.querySelector(".close-add-popup");
let add_event_choose_faculty = document.querySelector(".add-faculty")
let add_event_title= document.querySelector("#add-title");
let add_event_st_date = document.querySelector("#add-st-date");
let add_event_ed_date = document.querySelector("#add-ed-date");
let add_event_st_time = document.querySelector("#add-st-time");
let add_event_ed_time = document.querySelector("#add-ed-time");
let add_event_days = document.querySelectorAll(".add-event-day input");
let add_event_des = document.querySelector("#add-details")
let add_event_msg = document.querySelector(".add-event-msg");
let add_event_submit = document.querySelector(".add-event-submit")



// remove faculty confirmation
let remove_faculty_popup = document.querySelector(".remove-faculty-confirm")
let remove_faculty_cross = document.querySelector(".remove-faculty-header span")
let remove_faculty_submit = document.querySelector(".remove-faculty-submit")


// send todays schedule confirmation
let remind_faculty_popup = document.querySelector(".reminder-faculty-confirm")
let remind_faculty_cross = document.querySelector(".reminder-faculty-header span")

// send mail popup
let send_mail_popup = document.querySelector(".send-mail-popup")
let send_mail_close = document.querySelector(".send-mail-close i")
let send_mail_choose_faculty = document.querySelector(".send-mail-choose-faculty");
let send_mail_faculty = document.querySelector("#send-mail-choose-faculty");
let send_mail_subject = document.querySelector("#send-mail-subject");
let send_mail_body = document.querySelector("#send-mail-body");
let send_mail_submit = document.querySelector(".send-mail-submit");


// see event popup
let see_event_popup = document.querySelector(".see-event-popup")
let see_event_close_btn = document.querySelector(".close-see-popup");
let see_event_choose_faculty = document.querySelector(".see-faculty")
let see_event_title= document.querySelector("#see-title");
let see_event_st_date = document.querySelector("#see-st-date");
let see_event_ed_date = document.querySelector("#see-ed-date");
let see_event_st_time = document.querySelector("#see-st-time");
let see_event_ed_time = document.querySelector("#see-ed-time");
let see_event_des = document.querySelector("#see-details")


// add faculty popup
let add_faculty_popup = document.querySelector(".add-faculty-popup")
let add_faculty_cross = document.querySelector(".add-faculty-close i")
let add_faculty_submit = document.querySelector(".add-faculty-submit")
let add_faculty_name = document.querySelector("#add-faculty-name")
let add_faculty_email = document.querySelector("#add-faculty-email")
let add_faculty_phone = document.querySelector("#add-faculty-mobile")
let add_faculty_msg = document.querySelector(".add-faculty-msg")
let add_faculty_color = document.querySelector("#add-faculty-color")

// weekly calender
let weekly_schedule = document.querySelectorAll(".weekly-schedule");
let weekly_Schedule_wrapper = document.querySelector(".weekly-schedule-wrapper");

// monthly calender
let monthly_date = document.querySelectorAll(".monthly-date");



// all events
let allEvents = [];
 

