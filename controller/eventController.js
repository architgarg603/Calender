const connection = require("../connection");

let Days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


let inc_week = (date, month, yr) => {
    let totalDays = Days_in_month[month];
    if ((date + 7) > totalDays) {
        let rem = totalDays - date - 7;
        date = -rem;
        let obj = inc_month(date, month, yr);
        return obj;
    } else {

        date = date + 7;
        return { date, month, yr }
    }
}

let inc_month = (date, month, yr) => {
    if (month + 1 > 11) {
        month = 0;
        yr = yr + 1;
        return { date, month, yr }
    } else {
        month = month + 1;
        return { date, month, yr }
    }
}




function createEventHelper(newEvent) {
    return new Promise((resolve, reject) => {
        let Faculty_id = newEvent.mail;
        let title = newEvent.title;
        let st_date = newEvent.st_date;
        let ed_date = newEvent.ed_date;
        let st_time = newEvent.st_time;
        let ed_time = newEvent.ed_time;
        let details = newEvent.details;
        let day = newEvent.day.toLowerCase();
        let sql = `INSERT INTO \`${day}\`( \`Faculty_id\`, \`title\`, \`start_date\`, \`end_date\`, \`st-time\`, \`ed-time\`, \`Details\`) VALUES ("${Faculty_id}","${title}","${st_date}", "${ed_date}",${st_time},${ed_time},"${details}")`;
       
        connection.query(sql, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

function getEventOnPerticularDay(date, day,mail) {
    return new Promise(async (resolve, reject) => {
        let sql = `SELECT * FROM \`${day.toLowerCase()}\` WHERE start_date = "${date}" and Faculty_id = "${mail}"`;
        connection.query(sql, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    })
}

function addEventValidatorHelper(arr, st, ed) {

    for (let i = 0; i < arr.length; i++) {
        let obj = JSON.parse(JSON.stringify(arr[i]));
        if (!((obj["st-time"] >= st && ed <= obj["st-time"]) || (st >= obj["ed-time"] && ed >= obj["ed-time"]))) return false
    }

    return true;
}


async function addEventValidator(event) {
    let c_date = event.st_date.split("-");
    let dd = Number(c_date[2]);
    let mm = Number(c_date[1]) - 1;
    let yy = Number(c_date[0]);

    let e_date = event.ed_date.split("-");
    let e_dd = Number(e_date[2]);
    let e_mm = Number(e_date[1]) - 1;
    let e_yy = Number(e_date[0]);

    let data = [];
    let sDate = new Date(yy, mm, dd)
    let eDate = new Date(e_yy, e_mm, e_dd)
    while (sDate.getTime() <= eDate.getTime()) {
        let tempDate = "";
        if (mm <= 9) {
            if (dd <= 9)
                tempDate = `${yy}-0${mm + 1}-0${dd}`
            else
                tempDate = `${yy}-0${mm + 1}-${dd}`
        }
        else {
            if (dd <= 9)
                tempDate = `${yy}-${mm + 1}-0${dd}`
            else
                tempDate = `${yy}-${mm + 1}-${dd}`
        }

        let allEvents = await getEventOnPerticularDay(tempDate,event.day,event.mail);
        let check = addEventValidatorHelper(allEvents,event.st_time, event.ed_time);
        if(!check)return false;

      
        let date_obj = inc_week(dd, mm, yy);
        dd = Number(date_obj.date);
        mm = Number(date_obj.month);
        yy = Number(date_obj.yr);
        sDate = new Date(yy, mm, dd)
    }

    return true;

}

async function createEvent(req, res) {
    try {
        let event = req.body;

        let c_date = event.st_date.split("-");
        let dd = Number(c_date[2]);
        let mm = Number(c_date[1]) - 1;
        let yy = Number(c_date[0]);

        let e_date = event.ed_date.split("-");
        let e_dd = Number(e_date[2]);
        let e_mm = Number(e_date[1]) - 1;
        let e_yy = Number(e_date[0]);

        let data = [];
        let sDate = new Date(yy, mm, dd)
        let eDate = new Date(e_yy, e_mm, e_dd)
      
        // ===============================================================

        let check =await addEventValidator({"st_date":event.st_date,"ed_date":event.ed_date,"st_time":event.st_time,"ed_time":event.ed_time,"day":event.day,"mail": event.Faculty_id})
        if(!check){
            res.json({
                message: "event creations failed !!",
                err: "already added event on same time",
            });
            return;
        }

        // =====================================================================
        while (sDate.getTime() <= eDate.getTime()) {
            let tempDate = "";
            if (mm <= 9) {
                if (dd <= 9)
                    tempDate = `${yy}-0${mm + 1}-0${dd}`
                else
                    tempDate = `${yy}-0${mm + 1}-${dd}`
            }
            else {
                if (dd <= 9)
                    tempDate = `${yy}-${mm + 1}-0${dd}`
                else
                    tempDate = `${yy}-${mm + 1}-${dd}`
            }


            let dataPart = await createEventHelper({ "mail": event.Faculty_id, "title": event.title, "st_date": tempDate, "ed_date": tempDate, "st_time": event.st_time, "ed_time": event.ed_time, "details": event.details, "day": event.day });
          
            data.push(dataPart)
            let date_obj = inc_week(dd, mm, yy);
            dd = Number(date_obj.date);
            mm = Number(date_obj.month);
            yy = Number(date_obj.yr);
            sDate = new Date(yy, mm, dd)
        }

        res.json({
            message: "event added succesfully",
            data: data,
        });
    } catch (err) {
        res.json({
            message: "event creations failed !!",
            err: err,
        });
    }
};

function getAllEventHelper(day) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM \`${day.toLowerCase()}\``;
        connection.query(sql, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}
async function getAllEvent(req, res) {
    try {
        let allEvents = [];
        for (let i = 0; i < 7; i++) {
            let data = await getAllEventHelper(daylist[i]);
            allEvents.push(data)
        }
        res.json({
            message: "succesfully get all events",
            data: allEvents,
        });
    } catch (err) {
        res.json({
            message: "failed to get all events !!",
            data: err,
        });
    }
};

module.exports.getAllEvent = getAllEvent;
module.exports.createEvent = createEvent;