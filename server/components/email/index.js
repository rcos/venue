/**
* Allows sending of emails for various site services. The email service to use
* is determined by the emailService specified in the application config.
*/

var config = require('../../config/environment');
var fs = require('fs');
var path = require('path');
var signupTemplate = fs.readFileSync(path.join(__dirname,"templates","signup.html"), "utf8");
var forgotPasswordTemplate = fs.readFileSync(path.join(__dirname,"templates","forgotPassword.html"), "utf8");

var emailClient;
switch(config.emailService){
  case "SMTP":
    emailClient = require("./smtp");
    break;
  case "SENDGRID":
    emailClient = require("./sendgrid");
    break;
  case "MOCK":
    emailClient = require("./mock");
    console.log("USING MOCK EMAIL CLIENT");
    break;
  default:
    emailClient = { send: () => console.error("No Email Service!") };
}


/**
 * Sends the initial signup email.
 * @param  {object}   message  {email, name, verifyURL}
 * @param  {Function} callback Function to call after queuing or sending email
 */
 module.exports.signup = (message, callback) => {
   callback = callback || function(){};
   var templated = signupTemplate.replace(/\-name\-/g, message.name)
                                 .replace(/\-verifyURL\-/g, message.verifyURL);
   message.html = templated;
   message.subject = "[Venue] Signup Verification";
   emailClient.send(message, callback);
 };

/**
 * Sends a "forgot password" email.
 * @param  {object}   message  {email, name, verifyURL}
 * @param  {Function} callback Function to call after queuing or sending email
 */
 module.exports.forgotPassword = (message, callback) => {
   callback = callback || function(){};
   var templated = forgotPasswordTemplate.replace(/\-name\-/g, message.name)
                                         .replace(/\-verifyURL\-/g, message.verifyURL);
   message.html = templated;
   message.subject = "[Venue] Forgot Email";
   emailClient.send(message, callback);
 };
