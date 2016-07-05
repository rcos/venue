'use strict';

var express = require('express');
var controller = require('./course.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/image', controller.image);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
