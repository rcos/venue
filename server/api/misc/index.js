'use strict';

var express = require('express');
var controller = require('./misc.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/reseed', auth.hasRole('admin'), controller.reseed);

module.exports = router;
