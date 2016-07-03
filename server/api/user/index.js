'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/examplecsv.csv', controller.getExampleCSVUpload);
router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/verify/:token', controller.verify);
router.get('/:id/sections', auth.isAuthenticated(), controller.sections);
router.get('/:id/events', auth.isAuthenticated(), controller.events);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/enroll', auth.isAuthenticated(), controller.enrollInSection);
router.put('/:id/unenroll', auth.isAuthenticated(), controller.unenrollInSection);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.post('/csv', auth.hasRole('admin'), controller.createFromCSVUpload);

export default router;
