'use strict';

import mongoose from 'mongoose';

var SettingSchema = new mongoose.Schema({
  semester: String,
  login: {
    cas: { default: false, type: Boolean},
    local: { default: true, type: Boolean}
  },
  active: { default: true, type: Boolean}
});

export default mongoose.model('Setting', SettingSchema);
