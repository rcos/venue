'use strict';

var express = require('express');
var controller = require('./section.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', (req,res,next)=>{
    if (req.query.onlyUser === "me" || req.query.onlyCurrentUser){
      auth.isAuthenticated()(req, res, ()=>{
        controller.mySections(req,res,next);
      })
    }
    else if (req.query.onlyUser){
      auth.isAuthenticated()(req, res, ()=>{
        req.params.id = req.query.onlyUser;
        userSections(req, res,next);
      })
    }
    else{
      next()
    }
},controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
