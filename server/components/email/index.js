/**
 * Email Module. The email service to use is determined by the emailService
 * in the config.
 */

/**
 * Sends the initial signup email.
 * @param  {object}   message  {email, name, verifyURL}
 * @param  {Function} callback Function to call after queuing or sending email
 */
module.exports.signup = (message, callback) => console.error("No Email Service!");

/**
 * Sends a "forgot password" email.
 * @param  {object}   message  {email, name, verifyURL}
 * @param  {Function} callback Function to call after queuing or sending email
 */
module.exports.forgotPassword = (message, callback) => console.error("No Email Service!");

var config = require('../../config/environment');

if (config.emailService == "SMTP"){
  module.exports = require("./smtp");
}else if (config.emailService == "SENDGRID"){
  module.exports = require("./sendgrid");
}else if (config.emailService == "MOCK"){
  module.exports = require("./mock");
}
