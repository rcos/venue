'use strict';

var express = require('express');
var controller = require('./section.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/user/me',auth.isAuthenticated(), controller.me);
router.get('/user/:id', auth.hasRole('admin'), controller.getByUser);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
