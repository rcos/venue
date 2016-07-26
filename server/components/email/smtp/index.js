var nodemailer = require('nodemailer');
var config = require('../../../config/environment');

// create reusable transporter object using the default SMTP transport
var transportString = `smtps://${encodeURIComponent(config.smtpLogin)}:${encodeURIComponent(config.smtpPassword)}@${config.smtpServer}`;
var transporter = nodemailer.createTransport(transportString);

module.exports.send = (message, callback) => {
    var mailOptions = {
        from: `"Venue Team" <${config.serverEmail}>`,
        to: message.email,
        subject: message.subject,
        text: message.html,
        html: message.html
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error) console.log(error);
        callback();
    });
};
