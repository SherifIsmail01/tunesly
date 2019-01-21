var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
	name: String,
	image: String,
	releaseDate: String
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;

