var User = require('../../api/user/user.model');
var SectionEvent = require('../../api/sectionevent/sectionevent.model');
var Section = require('../../api/section/section.model');
var notify = require('../../notify');

exports.setup = (agenda) => {

  /* Agenda Job: sectionEvent creation
   * Called on sectionEvent creation
   *
   * Sends emails to students in section at time called
   * Schedules email to be send at time of event and variable time before
   */
  agenda.define('create sectionEvent', (job, done) => {
    notify.createSectionEvent(job.attrs.data.user, job.attrs.data.eventInfo, ()=> done());
  });

  /* Agenda Job: sectionEvent reminder
   * Sends reminder notification to students at time scheduled time before event
   */
  agenda.define('sectionEvent reminder', (job, done) => {
    notify.remindSectionEvent(job.attrs.data.user, job.attrs.data.eventInfo, ()=> done());
  });

}
