'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import User from '../api/user/user.model';

// Import auth strategy modules
import casAuth from './cas';
import localAuth from './local';
import facebookAuth from './facebook';
import twitterAuth from './twitter';
import googleAuth from './google';

import {setup as casSetup} from './cas/passport';
import {setup as localSetup} from './local/passport';
import {setup as facebookSetup} from './facebook/passport';
import {setup as googleSetup} from './google/passport';
import {setup as twitterSetup} from './twitter/passport';

// Passport Configuration
if (config.cas.serverURL) casSetup(User, config);
localSetup(User, config);
facebookSetup(User, config);
googleSetup(User, config);
twitterSetup(User, config);

var router = express.Router();

if (config.cas.serverURL) router.use('/cas', casAuth);
router.use('/local', localAuth);
router.use('/facebook', facebookAuth);
router.use('/twitter', twitterAuth);
router.use('/google', googleAuth);

export default router;
