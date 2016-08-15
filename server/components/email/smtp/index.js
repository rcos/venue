var nodemailer = require('nodemailer');
var config = require('../../../config/environment');

// create reusable transporter object using the default SMTP transport
var transportString = `smtps://${encodeURIComponent(config.smtpLogin)}:${encodeURIComponent(config.smtpPassword)}@${config.smtpServer}`;
var transporter = nodemailer.createTransport(transportString);

transporter.verify(function(error, success) {
   if (error) {
      console.log("SMTP Error:", error);
      console.log("SMTP not working, exiting process...");
      process.exit(-1);
   } else {
      console.log('SMTP Access Verified');
   }
});

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
