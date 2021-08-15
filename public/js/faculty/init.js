
async function getAllEvents() {
    let data = await axios.post("http://localhost:4000/event/get");
    allEvents = data.data.data
    set_daily_calender();
    set_weekly_calender()
    set_monthly_calender();
}
see_event_close_btn.addEventListener("click", function () {
    see_event_popup.style.display = "none"
})

async function set_daily_calender() {
    let prevDiv = document.querySelectorAll(".daily-schedule-view-part-wrapper");
    for (let i = 0; i < prevDiv.length; i++)prevDiv[i].remove();
    let cnt = 0;
    for (let i = 0; i < allEvents[day].length; i++) {
        let tempDate = "";
        let dd = date;
        let mm = month + 1;
        let yy = yr;
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
        if (allEvents[day][i]["start_date"].split("T")[0] == tempDate) {
            let data = await axios.post("http://localhost:4000/faculty/getid", { mail: allEvents[day][i].Faculty_id })

            let { Name, Color, Email } = data.data.data[0];
            if (!Color) Color = "blue";
            if (Email != set_mail) continue;
            let st = allEvents[day][i]["st-time"];
            let ed = allEvents[day][i]["ed-time"]
            let wrapper = document.createElement("div");
            wrapper.classList.add("daily-schedule-view-part-wrapper");
            let x = (st / 100);
            wrapper.style.minWidth = (Math.abs((ed / 100) - x) * 80) + "px"
            wrapper.style.left = (80 * (x - 1)) + "px";
            wrapper.style.top = ((130 * cnt) + (45)) + "px"
            wrapper.style.backgroundColor = Color
            wrapper.setAttribute("mail", allEvents[day][i].Faculty_id)
            wrapper.innerHTML = `<div class="daily-schedule-view-part-title"  > ${allEvents[day][i].title} </div>   
                            <div class="daily-schedule-view-part-timing">${st}-${ed}</div>
                            <div class="daily-schedule-view-part-name">${Name}</div>`
            cnt++;
            wrapper.addEventListener("click", () => { set_see_event(allEvents[day][i].title, Name, tempDate, tempDate, st, ed, allEvents[day][i].Details) });
            daily_div.appendChild(wrapper)
        }
    }


}

async function set_monthly_calender() {
    let prevDiv = document.querySelectorAll(".monthly-schedule-wrapper");

    for (let i = 0; i < prevDiv.length; i++)prevDiv[i].remove();
    for (let j = 0; j < 7; j++) {
        for (let i = 0; i < allEvents[j].length; i++) {
            let tempDate = "";
            let dd = allEvents[j][i]["start_date"].split("T")[0].split("-")[2];
            dd = Number(dd)
            let mm = month + 1;
            let yy = yr;
            if (mm <= 9) {
                tempDate = `${yy}-0${mm}`
            }
            else {
                tempDate = `${yy}-${mm}`
            }
            let checkDate = allEvents[j][i]["start_date"].split("T")[0].split("-");
            checkDate = checkDate[0] + "-" + checkDate[1];
            let addOn = new Date(yy, mm - 1, "01").getDay() - 1;
            if (checkDate == tempDate) {
                let data = await axios.post("http://localhost:4000/faculty/getid", { mail: allEvents[j][i].Faculty_id })
                if (!data.data.data[0]) continue;
                let { Name, Color, Email } = data.data.data[0];
                if (Email != set_mail) continue;
                if (!Color) Color = "blue";
                let wrapper = document.createElement("div");
                wrapper.classList.add("monthly-schedule-wrapper");
                wrapper.setAttribute("mail", allEvents[j][i].Faculty_id)
                wrapper.innerHTML = ` <div class="monthly-schedule-wrapper-color" style="background-color:${Color} ;" ></div>
                <div class="monthly-schedule-wrapper-title">${allEvents[j][i].title}</div>`
                let see_date = allEvents[j][i]["start_date"].split("T")[0];
                let st = allEvents[j][i]["st-time"];
                let ed = allEvents[j][i]["ed-time"]

                wrapper.addEventListener("click", () => { set_see_event(allEvents[j][i].title, Name, see_date, see_date, st, ed, allEvents[j][i].Details) })
                monthly_dates[addOn + dd].appendChild(wrapper)
            }
        }
    }
}

async function set_weekly_calender() {
    let days_in_month = Days_in_month[month];
    let last_month_days = (month - 1 >= 0 ? Days_in_month[month - 1] : Days_in_month[11])
    let date_Arr = [];
    for (let i = 0; i < 7; i++) {
        if (date - day + i <= 0) {

            date_Arr.push(getCorrectDate((last_month_days + date - day + i), (month - 1), yr))
        } else if (date - day + i > days_in_month) {
            date_Arr.push(getCorrectDate((date - day + i) % days_in_month), (month + 1), yr);
        } else {
            date_Arr.push(getCorrectDate((date - day + i), month, yr));
        }
    }
    let prevDiv = document.querySelectorAll(".weekly-schedule-wrapper-event");

    for (let i = 0; i < prevDiv.length; i++)prevDiv[i].remove();

    for (let j = 0; j < 7; j++) {
        let cnt = 1;
        for (let i = 0; i < allEvents[j].length; i++) {

            let checkDate = allEvents[j][i]["start_date"].split("T")[0]
            if (date_Arr.includes(checkDate)) {
                let data = await axios.post("http://localhost:4000/faculty/getid", { mail: allEvents[j][i].Faculty_id })
                if (!data.data.data[0]) continue;
                let { Name, Color, Email } = data.data.data[0];
                if (Email != set_mail) continue;
                if (!Color) Color = "blue";
                let wrapper = document.createElement("div");
                wrapper.classList.add("weekly-schedule-wrapper-event");
                wrapper.setAttribute("mail", allEvents[j][i].Faculty_id)
                let st = allEvents[j][i]["st-time"];
                let ed = allEvents[j][i]["ed-time"]
                st = Number(st);
                ed = Number(ed)
                let x = parseInt(st / 100);
                wrapper.style.top = (cnt * 12 + (j * 84)) + "px"
                wrapper.style.left = (80 * (x - 1)) + "px";
                wrapper.innerHTML = ` <div class="monthly-schedule-wrapper-color" style="background-color:${Color} ;" ></div>
                <div class="monthly-schedule-wrapper-title">${allEvents[j][i].title}</div>`
                wrapper.addEventListener("click", () => { set_see_event(allEvents[j][i].title, Name, checkDate, checkDate, st, ed, allEvents[j][i].Details) })
                weekly_Schedule_wrapper.appendChild(wrapper)
                cnt++;
            }
        }
    }

}

function getCorrectDate(date, month, yr) {
    let tempDate = "";
    let dd = date;
    let mm = month + 1;
    let yy = yr;
    if (mm <= 9) {
        if (dd <= 9)
            tempDate = `${yy}-0${mm}-0${dd - 1}`
        else
            tempDate = `${yy}-0${mm}-${dd - 1}`
    }
    else {
        if (dd <= 9)
            tempDate = `${yy}-${mm}-0${dd - 1}`
        else
            tempDate = `${yy}-${mm}-${dd - 1}`
    }

    return tempDate;
}
function getCorrectTime(time) {
    time = time + "";
    if (time.length == 2) {
        return "00:" + time;
    }
    if (time.length == 3) {
        return "0" + time.substring(0, 1) + ":" + time.substring(1);
    }

    return time.substring(0, 2) + ":" + time.substring(2);
}
function set_see_event(title, name, st_date, ed_date, st_time, ed_time, details) {

    see_event_title.value = title;
    see_event_st_date.value = st_date
    see_event_ed_date.value = ed_date;
    see_event_st_time.value = getCorrectTime(st_time)
    see_event_ed_time.value = getCorrectTime(ed_time)
    see_event_des.value = details;
    see_event_choose_faculty.innerHTML = ` <span>Faculty :</span> <span>${name}</span>`
    see_event_popup.style.display = "block"

}

logout.addEventListener("click", async function () {
    await axios.post("http://localhost:4000/user/logout");
    window.location.href = "/login";
})

getAllEvents();
