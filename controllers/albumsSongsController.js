var db = require('../models');

function create(req, res) {
	console.log(req.params.id);
	db.Album.findById(req.params.id, function (err, locateAlbum) {
		if (err) {
			console.log('error: ', err)
		}
		var newSong = new db.Song({
			name: req.body.name,
			trackNumber: req.body.trackNumber
		});
		console.log(newSong);
		locateAlbum.songs.push(newSong);
		locateAlbum.save(function (err, savedAlbum) {
			if (err) {
				console.log(err);
			}
			res.json(locateAlbum);
		});
		console.log(locateAlbum);
	});

}


module.exports = {
	create: create
}

