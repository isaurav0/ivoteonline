var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "donotreplytothismailever@gmail.com",
          pass: "ivoteonline404"
        },
});

module.exports = transporter;