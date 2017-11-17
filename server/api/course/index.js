//@flow
'use strict';

import express from 'express';
import * as controller from './course.controller';
import * as auth from '../../auth/auth.service';
import multer from 'multer';
import config from '../../config/environment';

var router = new express.Router();

let upload = multer({ 'dest': config.tmpUploadPath });

router.get('/', controller.index);
router.get('/image/:name', controller.image);
router.get('/image/:size/:name', controller.imageSize);
router.get('/:id', controller.show);
router.post('/', auth.canAddCourse(), upload.array('files[0]'), controller.create);
router.put('/:id', (req,res,next)=>{
    if (req.body.confirm.administrators || req.body.remove.administrators || req.body.confirm.assistants || req.body.remove.assistants){
        auth.canAdminCourse()(req, res, next);
    }else {
        auth.canEditCourse()(req, res, next);
    }
}, upload.array('files[0]'), controller.update);
router.patch('/:id', (req,res,next)=>{
    if (req.body.confirm.administrators || req.body.remove.administrators || req.body.confirm.assistants || req.body.remove.assistants){
        auth.canAdminCourse()(req, res, next);
    }else {
        auth.canEditCourse()(req, res, next);
    }
}, upload.array('files[0]'), controller.update);
router.delete('/:id', auth.canAdminCourse(), controller.destroy);

export default router;
