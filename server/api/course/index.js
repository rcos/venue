//@flow
'use strict';

import express from 'express';
import * as controller from './course.controller';
import * as auth from '../../auth/auth.service';

var router = new express.Router();

router.get('/', controller.index);
router.get('/image/:name', controller.image);
router.get('/image/:size/:name', controller.imageSize);
router.get('/:id', controller.show);
router.post('/', auth.isInstructor(), controller.create);
router.put('/:id', auth.isInstructor(), controller.update);
router.patch('/:id', auth.isInstructor(), controller.update);
router.delete('/:id', auth.isInstructor(), controller.destroy);

export default router;
