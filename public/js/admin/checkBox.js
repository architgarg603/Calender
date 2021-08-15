function showSelectedEvent(div) {
    let mail = div.getAttribute("name");
    let allDaily = document.querySelectorAll(".daily-schedule-view-part-wrapper");
    let allMonthly = document.querySelectorAll(".monthly-schedule-wrapper")
    let allWeekly = document.querySelectorAll(".weekly-schedule-wrapper-event");
    if (div.checked) {

        for (let i = 0; i < allDaily.length; i++) {
            let attr = allDaily[i].getAttribute("mail");
            if (mail == attr) {
                allDaily[i].style.display = "block"
            }
        }
        for (let i = 0; i < allMonthly.length; i++) {
            let attr = allMonthly[i].getAttribute("mail");
            if (mail == attr) {
                allMonthly[i].style.display = "flex"
            }
        }
        for (let i = 0; i < allWeekly.length; i++) {
            let attr = allWeekly[i].getAttribute("mail");
            if (mail == attr) {
                allWeekly[i].style.display = "flex"
            }
        }
    } else {

        for (let i = 0; i < allDaily.length; i++) {
            let attr = allDaily[i].getAttribute("mail");
            if (mail == attr) {
                allDaily[i].style.display = "none"
            }
        }
        for (let i = 0; i < allMonthly.length; i++) {
            let attr = allMonthly[i].getAttribute("mail");
            if (mail == attr) {
                allMonthly[i].style.display = "none"
            }
        }
        for (let i = 0; i < allWeekly.length; i++) {
            let attr = allWeekly[i].getAttribute("mail");
            if (mail == attr) {
                allWeekly[i].style.display = "none"
            }
        }
    }
}