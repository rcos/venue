'use strict';

import {Router} from 'express';
import * as controller from './submission.controller';
import * as auth from '../../auth/auth.service';
import multer from 'multer';
import config from '../../config/environment';

var router = new Router();

let upload = multer({ 'dest': config.tmpUploadPath });

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/image/:userId/:eventId/:name', controller.image);
router.get('/image/:userId/:eventId/:size/:name', controller.imageSize);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isStudent(), upload.array('files[0]'), controller.create);
router.put('/:id', auth.isStudent(), upload.array('files[0]'), controller.update);
router.patch('/:id', auth.isStudent(), upload.array('files[0]'), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

export default router;
