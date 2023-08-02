const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, //"smtp.yandex.ru",
    port: process.env.MAIL_PORT ?? 465,
    secure: true, // use TLS
    auth: {
        user: process.env.MAIL_USER, //""s@trnw.ru",
        pass: process.env.MAIL_PASS, //"rndxcazkpnjozwru",
    },
});

module.exports = transporter;