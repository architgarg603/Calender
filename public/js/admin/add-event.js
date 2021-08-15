
let inc_day_return = (date, month, yr) => {
    let totalDays = Days_in_month[month];
    if (date + 1 > totalDays) {
        date = 1;
        return inc_month_return(date, month, yr);

    } else {
        date = date + 1;
        return { date, month, yr }
    }
}
let inc_week_return = (date, month, yr) => {
    let totalDays = Days_in_month[month];
    if ((date + 7) > totalDays) {
        let rem = totalDays - date - 7;
        date = -rem;
        let obj = inc_month_return(date, month, yr);
        return obj;
    } else {

        date = date + 7;
        return { date, month, yr }
    }
}

let inc_month_return = (date, month, yr) => {
    if (month + 1 > 11) {
        month = 0;
        yr = yr + 1;
        return { date, month, yr }
    } else {
        month = month + 1;
        return { date, month, yr }
    }
}

add_event_submit.addEventListener("click", async function () {
    let add_event_select_faculty = document.querySelector("#add-faculty");

    let Faculty_id = add_event_select_faculty.value;
    let title = add_event_title.value;
    let st_date = add_event_st_date.value;
    let ed_date = add_event_ed_date.value;
    let st_time = add_event_st_time.value;
    st_time = Number(st_time.split(":").join(""))
    let ed_time = add_event_ed_time.value;
    ed_time = Number(ed_time.split(":").join(""))
    let details = add_event_des.value;
    let selected_Days = [];
    for (let i = 0; i < 7; i++) {
        if (add_event_days[i].checked == true) {
            selected_Days.push(daylist[i]);
        }
    }
    let sDate = new Date(st_date).getTime();
    let eDate = new Date(ed_date).getTime()
    if (sDate > eDate) {
        add_event_msg.innerHTML = "Starting date is greater than ending";
        return;
    }

    if (Faculty_id && title && st_date && ed_date && st_time && ed_time && selected_Days.length) {
        let st_day = new Date(st_date);
        st_day = st_day.getDay();
        let curr_date = st_date.split("-");
        let dd = Number(curr_date[2]);
        let mm = Number(curr_date[1]);
        let yy = Number(curr_date[0]);
        for (let i = 0; i < 7; i++) {
            let tempDate = "";
            if (mm <= 9) {
                if (dd <= 9)
                    tempDate = `${yy}-0${mm}-0${dd}`
                else
                    tempDate = `${yy}-0${mm}-${dd}`
            }
            else {
                if (dd <= 9)
                    tempDate = `${yy}-${mm}-0${dd}`
                else
                    tempDate = `${yy}-${mm}-${dd}`
            }
            if (selected_Days.includes(daylist[(st_day + i) % 7])) {
                let data = await axios.post("http://localhost:4000/event/add", {
                    Faculty_id,
                    title,
                    "st_date": tempDate,
                    ed_date,
                    st_time,
                    ed_time,
                    details,
                    day: daylist[(st_day + i) % 7]
                })
                console.log({
                    Faculty_id,
                    title,
                    "st_date": tempDate,
                    ed_date,
                    st_time,
                    ed_time,
                    details,
                    day: daylist[(st_day + i) % 7]
                });
                console.log(data);
                if(data.data.err)alert("already have event on same date")

            }
            let date_obj = inc_day_return(dd, mm, yy);
            dd = Number(date_obj.date);
            mm = Number(date_obj.month);
            yy = Number(date_obj.yr);


        }

        add_event_msg.innerHTML = ""
        add_event_title.innerHTML = "";
         add_event_st_date.value =  "2021-07-01";
         add_event_ed_date.value = "2021-07-01";
        add_event_popup.style.display = 'none'
    } else {
        add_event_msg.innerHTML = "All Fields are required"
        
    }
})