'use strict';

var express = require('express');
var controller = require('./section.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// TODO move this check into the controller
router.get('/', (req,res,next)=>{
    if ((req.query.onlyUser || "").toLowerCase() === "me" || req.query.onlyCurrentUser){
        auth.isAuthenticated()(req, res, ()=>{
            controller.mySections(req,res,next);
        });
    }else if (req.query.onlyUser){
        auth.isAuthenticated()(req, res, ()=>{
            req.params.id = req.query.onlyUser;
            controller.userSections(req, res, next);
        });
    }else{
        next();
    }
}, controller.index);
router.get('/:id', controller.show);
router.post('/', auth.canAdminCourse(), controller.create);
router.put('/:id', (req,res,next)=>{
    if (req.body.confirm.instructors || req.body.remove.instructors || req.body.confirm.assistants || req.body.remove.assistants){
        auth.canAdminSection()(req, res, next);
    }else {
        auth.canEditSection()(req, res, next);
    }
}, controller.update);
router.patch('/:id', (req,res,next)=>{
    if (req.body.confirm.instructors || req.body.remove.instructors || req.body.confirm.assistants || req.body.remove.assistants){
        auth.canAdminSection()(req, res, next);
    }else {
        auth.canEditSection()(req, res, next);
    }
}, controller.update);
router.delete('/:id',  auth.canAdminSection(), controller.destroy);

export default router;
