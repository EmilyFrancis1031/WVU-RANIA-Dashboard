var nodemailer = require("nodemailer");

function send_email(subject, content){

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.TRANSPORTER_USER,
            pass: process.env.TRANSPORTER_PASSWORD,
        },
    });
    var mailOptions = {
        from: process.env.TRANSPORTER_USER,
        to: process.env.AUTH_EMAIL,
        subject: subject,
        text: content,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            //console.log(error);
        } else {
            //console.log("Email sent: " + info.response);
        }
    });

}

module.exports = send_email