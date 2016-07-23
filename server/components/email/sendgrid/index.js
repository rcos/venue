var sendgrid = require("sendgrid")(config.sendgridKey);
var config = require('../../config/environment');

module.exports.send = (message, callback) => {
    var email = sendgrid.Email();
    email.addTo(message.email);
    email.subject = message.subject;
    email.from = config.serverEmail;
    email.setHtml(message.html);
    sendEmail(email, callback);
};

function sendEmail(email, callback){
    sendgrid.send(email, function(err, json){
        if (err){
          callback("An error occurred sending the email");
          console.error(err, json);
        }else{
          callback(null);
        }
    });
}
