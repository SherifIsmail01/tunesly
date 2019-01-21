var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tunesly-app');

module.exports.Album = require('./album.js');


