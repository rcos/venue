'use strict';

var express = require('express');
var controller = require('./sectionevent.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isInstructor(), controller.create);
router.put('/:id', auth.isInstructor(), controller.update);
router.patch('/:id', auth.isInstructor(), controller.update);
router.delete('/:id', auth.isInstructor(), controller.destroy);

module.exports = router;
