for (let i = 0; i < 24; i++) {
    daily_schedule[i].addEventListener("click", function () {
        if(i==23){
            add_event_st_time.value = "00"+ ":00";
            add_event_ed_time.value = "00"+ ":00";
            add_event_popup.style.display = "block"
            return
        }
        if (i < 9) {
            add_event_st_time.value = "0" + (i+1) + ":00";
            add_event_ed_time.value = "0" + (i+1) + ":00";
            add_event_popup.style.display = "block"
        }
        else {
            add_event_ed_time.value = (i+1) + ":00";
            add_event_st_time.value = (i+1) + ":00";
            add_event_popup.style.display = "block"
        }
    })
}

for (let i = 0; i < 24; i++) {
    weekly_schedule[i].addEventListener("click", function () {
        if(i==23){
            add_event_st_time.value = "00"+ ":00";
            add_event_ed_time.value = "00"+ ":00";
            add_event_popup.style.display = "block"
            return
        }
        if (i < 9) {
            add_event_st_time.value = "0" + (i+1) + ":00";
            add_event_ed_time.value = "0" + (i+1) + ":00";
        }
        else {
            add_event_ed_time.value = (i+1) + ":00";
            add_event_st_time.value = (i+1) + ":00";
        }
        add_event_popup.style.display = "block"
    })
}

for(let i= 0;i<42;i++){
    monthly_date[i].addEventListener("click",function(){
        let val = monthly_date[i].innerText.split("\n")[0];
        if(val){
            let clicked_date = yr+"-"+(month+1)+"-"+val;
            if(month<9)clicked_date = yr+"-0"+(month+1)+"-"+val;
            if(val<=9)clicked_date = yr+"-"+(month+1)+"-0"+val;
            if(val<=9 && month<9)clicked_date = yr+"-0"+(month+1)+"-0"+val;
            add_event_st_date.value = clicked_date
            add_event_ed_date.value = clicked_date
            add_event_st_time.value = "00"+ ":00";
            add_event_ed_time.value = "00"+ ":00";
            add_event_popup.style.display = "block"
        }
    })
}

for(let j=0;j<12;j++){
    let yearly_Date = yearly_parts[j].querySelectorAll(".yearly-calender-date");
    for(let i= 0;i<42;i++){
        yearly_Date[i].addEventListener("click",function(){
            let val = yearly_Date[i].innerHTML;
            if(val){
                let clicked_date = yr+"-"+(j+1)+"-"+val;
                console.log(j);
                if(j<9)clicked_date = yr+"-0"+(j+1)+"-"+val;
                if(val<=9)clicked_date = yr+"-"+(j+1)+"-0"+val;
                if(val<=9 && j<9)clicked_date = yr+"-0"+(j+1)+"-0"+val;
                console.log(clicked_date);
                add_event_st_date.value = clicked_date
                add_event_ed_date.value = clicked_date
                add_event_st_time.value = "00"+ ":00";
                add_event_ed_time.value = "00"+ ":00";
                add_event_popup.style.display = "block"
            }
        })
    }
}

logout.addEventListener("click", async function(){
    await axios.post("http://localhost:4000/user/logout");
    window.location.href = "/login";
})