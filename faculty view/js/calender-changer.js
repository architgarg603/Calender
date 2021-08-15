calender_type_changer.addEventListener("change", function (e) {
    daily_div.style.display = "none";
    weekly_div.style.display = "none";
    monthly_div.style.display = "none";
    yearly_div.style.display = "none";
    if (e.target.value == "Daily")
        daily_div.style.display = "block";
    if (e.target.value == "Monthly")
        monthly_div.style.display = "block";
    if (e.target.value == "Weakly")
        weekly_div.style.display = "flex";
    if (e.target.value == "Yearly")
        yearly_div.style.display = "block";
})