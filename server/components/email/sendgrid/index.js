var config = require('../../../config/environment');
var sendgrid = require("sendgrid")(config.sendgridKey);

module.exports.send = (message, callback) => {
    var email = new sendgrid.Email();
    email.addTo(message.email);
    email.subject = message.subject;
    email.from = config.serverEmail;
    email.setHtml(message.html);
    sendEmail(email, callback);
};

function sendEmail(email, callback){
    sendgrid.send(email, function(err, json){
        if (err){
          if (callback) callback("An error occurred sending the email");
          console.error(err, json);
        }else{
          if (callback) callback(null);
        }
    });
}
