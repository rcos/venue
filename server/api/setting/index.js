'use strict';

var express = require('express');
var controller = require('./setting.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/current', controller.getCurrent);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/login', auth.hasRole('admin'), controller.changeLoginTypes);
router.put('/semester', auth.hasRole('admin'), controller.changeSemesterName);
router.put('/current', auth.hasRole('admin'), controller.changeCurrentSemester);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
