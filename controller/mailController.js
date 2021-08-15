const nodemailer = require("nodemailer");
const connection = require("../connection");
let daylist = ["Saturday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

async function mailFaculty(req, res) {
    try {
        let { email, subject, body } = req.body;
        let data = await mailFacultyHelper(email, subject, body);
        res.json({
            message: "succesfully mailed all faculty",
            data: data,
        });
    } catch (err) {
        res.json({
            message: "failed to mailed all faculty !!",
            data: err,
        });
    }
};

function mailFacultyHelper(email, subject, body) {
    return new Promise(async (resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: 'architg603@gmail.com',
                pass: '',
            },
        });

        let info = await transporter.sendMail({
            from: "architg603@gmail.com",
            to: email,
            subject: subject,
            text: body,
        });

        resolve();
    })

}

async function remind(req, res) {
    try {
        let today = new Date();
        date = String(today.getDate()).padStart(2, '0');
        date = Number(date)
        month = String(today.getMonth() + 1).padStart(2, '0');
        month = Number(month);
        yr = today.getFullYear();
        yr = Number(yr)
        let final_date = yr + "-" + (month) + "-" + date;
        if (month <= 9) final_date = yr + "-0" + (month) + "-" + date;
        if (date <= 9) final_date = yr + "-" + (month) + "-0" + date;
        if (date <= 9 && month <= 9) final_date = yr + "-0" + (month) + "-0" + date;
        let day = daylist[today.getDay()].toLowerCase();
        let appoitments = await remiderHelper(final_date, day);
        for (let i = 0; i < appoitments.length; i++) {
            let results = JSON.parse(JSON.stringify(appoitments[i]));
            let email = results.Faculty_id;
            let subject = "Todays Schedule";
            let start_time = results["st-time"];
            let end_time = results["ed-time"];
            let body = `Todays Schedule
                        Title - ${subject}
                        Date - ${results["start_date"]}
                        Details - ${results["Details"]}
                        Start time - ${start_time}
                        End time - ${end_time}`
            await mailFacultyHelper(email,subject,body);
        }
        
        res.json({
            message: "succesfully mailed all faculty",

        });
    }
    catch (err) {
        res.json({
            message: "failed to mailed all faculty",

        });
    }

}

function remiderHelper(date, day) {
    return new Promise(async (resolve, reject) => {
        let sql = `SELECT * FROM \`${day}\` WHERE start_date = "${date}"`;
        connection.query(sql, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    })

}




module.exports.mailFaculty = mailFaculty;
module.exports.remind = remind;
