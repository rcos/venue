'use strict';

import {Router} from 'express';
import * as controller from './eventinfo.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', controller.index);
router.get('/image/:name', controller.image);
router.get('/image/:size/:name', controller.imageSize);
router.get('/:id', controller.show);
router.post('/',auth.isAuthenticated(), controller.create);
router.put('/:id',auth.isAuthenticated(), controller.update);
router.patch('/:id',auth.isAuthenticated(), controller.update);
router.delete('/:id',auth.isAuthenticated(), controller.destroy);

export default router;
