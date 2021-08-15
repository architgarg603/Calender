let set_weekly_calender_dat = async ()=>{
    let days_in_month = Days_in_month[month];
    let last_month_days = (month-1>=0 ? Days_in_month[month-1] : Days_in_month[11])
    for(let i=0;i<7;i++){
        if(date-day+i<=0){
            weekly_days[i].innerHTML = last_month_days +date-day+i;
        }else if(date-day+i > days_in_month){
            weekly_days[i].innerHTML = (date-day+i)%days_in_month
        }else{
            weekly_days[i].innerHTML = date-day+i;
        }
    }
}

let set_monthly_calender_dates = async ()=>{
    let firstDay = (new Date(yr, month)).getDay();
    let number_of_days = Days_in_month[month];

    for (let i = 0; i < monthly_dates.length; i++) {
        monthly_dates[i].innerHTML = '';
    }
    for (let i = 0; i < number_of_days; i++) {
        monthly_dates[firstDay + i].innerHTML = i + 1;
    }
}

let set_yearly_calender_parts = async ()=>{
    for(let i=0;i<12;i++){
        set_yearly_part_helper(i);
    }
}

let set_yearly_part_helper = async (month)=>{
    let firstDay = (new Date(yr, month)).getDay();
    let number_of_days = Days_in_month[month];
    let yearly_calender_parts_days = yearly_parts[month].querySelectorAll(".yearly-calender-date")

    for (let i = 0; i < yearly_calender_parts_days.length; i++) {
        yearly_calender_parts_days[i].innerHTML = '';
    }
    for (let i = 0; i < number_of_days; i++) {
        yearly_calender_parts_days[firstDay + i].innerHTML = i + 1;
    }
}
set_yearly_calender_parts();
set_weekly_calender_dat()
set_monthly_calender_dates()