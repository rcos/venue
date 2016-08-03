/**
 * Scheduling module. This module allows for scheduling of tasks on the site
 * in a persistent way (i.e. surviving server restarts).
 *
 * Other modules can use the scheduler in the following manner...
 *
 * var scheduler = require("../../path/to/schedule");
 *
 * function handleSiteEvent(data){
 * 		...
 *   	scheduler.now("handle task", data);
 *   	OR
 *   	scheduler.schedule("tomorrow at 1pm", "handle task", data);
 * 		...
 * }
 */

var Agenda = require("agenda");
var agenda = exports.agenda = null;

// EXAMPLE JOB
// var showMessageJob = require('./jobs/showMessage');
var sectionEventJob = require('./jobs/sectionEvent');

function setupJobs(){
    // EXAMPLE JOB SETUP
    // showMessageJob.setup(agenda);
    sectionEventJob.setup(agenda);
}

function configurePeriodicJobs(){
  // EXAMPLE JOB SCHEDULING
  // agenda.every('5 seconds', 'show message');
}

/**
 * Starts agenda listener and initializes job handlers.
 * @param  {app config} config
 */
exports.start = (config) => {
  agenda = exports.agenda = new Agenda({
    db: {
      address: config.mongo.uri,
      collection: 'agendaJobs'
    }
  });

  agenda.on('ready', function(){
    setupJobs();
    configurePeriodicJobs();
  });

  agenda.start();
};

/**
 * Schedule a job to be performed ASAP
 * @param  {string}   task   job name
 * @param  {any}   params parameters to job
 * @param  {Function} cb     called after job added to queue
 * @return {Job} Agenda job object
 */
exports.now = (task, params, cb) => agenda.now(task, params, cb)

/**
 * Schedule a job to be performed at a designated time
 * @param  {Date or stirng}   when   "tomorrow at noon" or Date()
 * @param  {string}   task   job name
 * @param  {any}   params parameters to job
 * @param  {Function} cb     called after job added to queue
 * @return {Job} Agenda job object
 */
exports.schedule = (when, task, params) => {
    return new Promise((resolve, reject) => {
        agenda.schedule(when, task, params, () => resolve());
    });
};

/**
 * Cancels a scheduled a job matching the query
 * @param  {Object} query i.e. "eventInfoId: 'a1200412933532'"
 * @param  {Function} cb  called with parameters (err, numRemoved)
 */
exports.cancel = (query) => {
   return new Promise((resolve, reject) => {
    agenda.cancel(query, (err, numRemoved)=> err ?
      reject(err) : resolve(numRemoved)
    );
  });
}

/**
 * Searches using a  full mongodb-native find query.
 * @param  {Object} query i.e. "eventInfoId: 'a1200412933532'"
 * @param  {Function} cb  called with parameters (err, jobs)
 */
exports.jobs = (query, cb) => agenda.jobs(query, cb);
