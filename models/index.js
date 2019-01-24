var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tunesly-app', { useNewUrlParser: true });

module.exports.Album = require('./album.js');
module.exports.Song = require('./song.js');

