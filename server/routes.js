/**
 * Main application routes
 */
'use strict';

import errors from './components/errors';
import path from 'path';

// Import API Endpoints
import courseRouter from './api/course';
import eventinfoRouter from  './api/eventinfo';
import sectionRouter from  './api/section';
import sectioneventRouter from './api/sectionevent';
import submissionRouter from './api/submission';
import userRouter from './api/user';
import miscRouter from './api/misc';
import authRouter from './auth';

export default function(app) {
  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/courses',         courseRouter);
  app.use('/api/eventinfos',      eventinfoRouter);
  app.use('/api/sections',        sectionRouter);
  app.use('/api/sectionevents',   sectioneventRouter);
  app.use('/api/submissions',     submissionRouter);
  app.use('/api/users',           userRouter);
  app.use('/api/misc',            miscRouter);
  app.use('/auth',                authRouter);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
