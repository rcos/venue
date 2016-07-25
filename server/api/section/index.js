'use strict';

var express = require('express');
var controller = require('./section.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// TODO move this check into the controller
router.get('/', (req,res,next)=>{
    if (req.query.onlyUser.toLowerCase() === "me" || req.query.onlyCurrentUser){
      auth.isAuthenticated()(req, res, ()=>{
        controller.mySections(req,res,next);
      })
    }
    else if (req.query.onlyUser){
      auth.isAuthenticated()(req, res, ()=>{
        req.params.id = req.query.onlyUser;
        controller.index(req, res,next);
      })
    }
    else{
      next()
    }
},controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id',  auth.isAuthenticated(), controller.update);
router.delete('/:id',  auth.isAuthenticated(), controller.destroy);

module.exports = router;
