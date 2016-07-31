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

// var showMessageJob = require('./jobs/showMessage');
var sectionEventJob = require('./jobs/sectionEvent');

function setupJobs(){
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
exports.schedule = (when, task, params, cb) => agenda.schedule(when, task, params, cb);

/**
 * Cancels a scheduled a job matching the query
 * @param  {Object} query i.e. "eventInfoId: 'a1200412933532'"
 * @param  {Function} cb  called with parameters (err, numRemoved)
 */
exports.cancel = (query, cb) => agenda.cancel(query, cb);

/**
 * Updates a scheduled job's data field or time
 * @param  {Object} query i.e. "eventInfoId: 'a1200412933532'"
 * @param  {string} data Information regarding the scheduled event
 * @param  {any}   params parameters to job
 */
exports.update = (query, data, params) => {
  data = data || {};
  params = params || {};
  console.log("scheduler updating!")

  agenda.jobs(query, function(err, jobs) {
    if(params.hasOwnProperty("updateTime")) {
      jobs.forEach(job =>{
        // Update time based off user
        console.log("update job here!")
      })
    }
    Object.keys(data).forEach(function(key,index) {
      jobs.forEach(job =>{
        job[key] = data[key]
      })
    });
    jobs.save();
  });
}
