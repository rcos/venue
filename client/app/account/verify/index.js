'use strict';

import VerifyAccountCtrl from './verify.controller';
import forgotPassword from './forgotPassword';
import resendEmail from './resendEmail';
import resetPassword from './resetPassword';
import constants from '../../app.constants';

export default angular.module('venueApp.verify', [forgotPassword, resendEmail, resetPassword, constants, 'venueApp.auth'])
  .controller('VerifyAccountCtrl', VerifyAccountCtrl)
  .name;
