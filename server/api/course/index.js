'use strict';

var express = require('express');
var controller = require('./course.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/image/:name', controller.image);
router.get('/image/:name/:size', controller.imageSize);
router.get('/:id', controller.show);
router.post('/', auth.isInstructor(), controller.create);
router.put('/:id', auth.isInstructor(), controller.update);
router.patch('/:id', auth.isInstructor(), controller.update);
router.delete('/:id', auth.isInstructor(), controller.destroy);

module.exports = router;
