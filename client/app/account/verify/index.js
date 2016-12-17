'use strict';

import VerifyAccountCtrl from './verify.controller';

import forgotPassword from './forgotPassword';
import resendEmail from './resendEmail';
import resetPassword from './resetPassword';

export default angular.module('venueApp.verify', [forgotPassword, resendEmail, resetPassword])
  .controller('VerifyAccountCtrl', VerifyAccountCtrl)
  .name;
