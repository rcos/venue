'use strict';

import {Router} from 'express';
import * as controller from './eventinfo.controller';
import * as auth from '../../auth/auth.service';
import multer from 'multer';
import config from '../../config/environment';

var router = new Router();

let upload = multer({ 'dest': config.tmpUploadPath });

router.get('/', controller.index);
router.get('/image/:name', controller.image);
router.get('/image/:size/:name', controller.imageSize);
router.get('/:id', controller.show);
router.post('/',auth.isAuthenticated(),upload.array('files[0]'), controller.create);
router.put('/:id',auth.isAuthenticated(),upload.array('files[0]'), controller.update);
router.patch('/:id',auth.isAuthenticated(),upload.array('files[0]'), controller.update);
router.delete('/:id',auth.isAuthenticated(), controller.destroy);

export default router;
