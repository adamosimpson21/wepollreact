require("dotenv").load();
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/wepoll')

mongoose.Promise = Promise;

module.exports.Item = require('./item')
module.exports.Party = require('./party')
module.exports.Question = require('./question')
module.exports.Review = require('./review')
module.exports.Result = require('./result')
module.exports.Tag = require('./tag')
module.exports.User = require('./user')