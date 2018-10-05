const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/wepoll')

mongoose.Promise = Promise;

module.exports.User = require('./user')
module.exports.Item = require('./item')
module.exports.Question = require('./question')