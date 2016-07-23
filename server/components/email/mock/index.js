var fs = require('fs');
var path = require('path');
var signupTemplate = fs.readFileSync(path.join(__dirname,"..","templates","signup.html"), "utf8");
var forgotPasswordTemplate = fs.readFileSync(path.join(__dirname,"..","templates","forgotPassword.html"), "utf8");

module.exports.signup = function(message, callback){
  callback = callback || function(){};
  console.log(`Sending ${message.email}`);
  var templated = signupTemplate.replace(/\-name\-/g, message.name)
                                .replace(/\-verifyURL\-/g, message.verifyURL);
  console.log(`${templated}`);
  callback();
}

module.exports.forgotPassword = function(message, callback){
  callback = callback || function(){};
  console.log(`Sending ${message.email}`);
  var templated = forgotPasswordTemplate.replace(/\-name\-/g, message.name)
                                        .replace(/\-verifyURL\-/g, message.verifyURL);
  console.log(`${template}`);
  callback();
}
