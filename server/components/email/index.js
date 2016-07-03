var config = require('../../config/environment');
var sendgrid = require("sendgrid")(config.sendgridKey);
var fs = require('fs');
var path = require('path');
var signupTemplate = fs.readFileSync(path.join(__dirname,"signup.html"), "utf8");

module.exports.signup = function(message, callback){
  callback = callback || function(){};
  var email = new sendgrid.Email();
  email.addTo(message.email);
  email.subject = "[Venue] Signup Verification";
  email.from = config.serverEmail;
  email.setHtml(signupTemplate); //pass in the string template we read from disk
  email.addSubstitution("-name-", message.name); //sub. variables
  email.addSubstitution("-verifyURL-", message.verifyURL); //sub. variables
  sendEmail(email, callback)
}

function sendEmail(email, callback){
    sendgrid.send(email, function(err, json){
        if (err){
          callback("An error occurred sending the email");
          console.error(err, json);
        }else{
          callback(null);
        }
    });
};
