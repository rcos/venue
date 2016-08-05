/**
 * Notify module. This module allows for users on the site.
 *
 *
 * function handleSiteEvent(data){
 * 		...
 *   	scheduler.now("handle task", data);
 *   	OR
 *   	scheduler.schedule("tomorrow at 1pm", "handle task", data);
 * 		...
 * }
 */

var Email = require('../components/email');

function send(user, opts, message, cb){

  cb();
}

/**
 * Schedule a job to be performed at a designated time
 * @param  {user} Should have fields: firstName, lastName, email, config
 * @param  {opts}   task   job name
 * @param  {message}   params parameters to job
 * @param  {Function} cb  called after job added to queue
 */
exports.send = (user, opts, message, cb) => send(user, opts, message, cb);

/**
 * Schedule a job to be performed at a designated time
 * @param  {User} user : Should have fields - firstName, lastName, email, config
 * @param  {eventInfo} eventInfo : section event object
 * @param  {Function} cb : called after job added to queue
 */
exports.createSectionEvent = (user, eventInfo, cb) => {
  if(user.preferences.recieveEmails) {
    Email.createSectionEvent({user:user, eventInfo:eventInfo}, cb);
  }
}

/**
 * Schedule a job to be performed at a designated time
 * @param  {User} user : Should have fields - firstName, lastName, email, config
 * @param  {eventInfo} eventInfo : section event object
 * @param  {Function} cb : called after job added to queue
 */
exports.remindSectionEvent = (user, eventInfo, cb) => {
  if(user.preferences.recieveEmails) {
    Email.remindSectionEvent({user:user, eventInfo:eventInfo}, cb);
  }
}
