var db = require('../models');

function index(req, res) {
	console.log(req.params);
	db.Album.findById(req.params.id, function(err, foundAlbum) {
		if (err) {
			console.log('error finding song: ', err);
		}
		res.json(foundAlbum.songs);
	});
}

function create(req, res) {
	// console.log(req.params.id);
	db.Album.findById(req.params.id, function (err, locateAlbum) {
		if (err) {
			console.log('error: ', err)
		}
		var newSong = new db.Song({
			name: req.body.name,
			trackNumber: req.body.trackNumber
		});
		// console.log(newSong);
		locateAlbum.songs.push(newSong);
		locateAlbum.save(function (err, savedAlbum) {
			if (err) {
				console.log(err);
			}
			res.json(locateAlbum);
		});
		// console.log(locateAlbum);
	});

}

function update(req, res) {
	console.log('req params: ', req.params);
	console.log('req body:', req.body);
	db.Album.findById(req.body.albumID, function (err, foundAlbum) {
		var songToBeUpdated = foundAlbum.songs.id(req.body.songID);
		if (songToBeUpdated) {
			songToBeUpdated.trackNumber = req.body.trackNumber;
			songToBeUpdated.name = req.body.name;

			foundAlbum.save(function(err, savedAlbum) {
				console.log('updated', songToBeUpdated, 'in: ', savedAlbum.songs);
				res.json(songToBeUpdated);
			});
		} else {
			res.send(404);
		}
	});
}

function destroy(req, res) {
	console.log('request body: ', req.body);
	db.Album.findById(req.body.albumID, function(err, foundAlbum) {
		if (err) {
			console.log('error finding album: ', err);
		}
		console.log('found album: ', foundAlbum);
		var songToBeDeleted = foundAlbum.songs.id(req.body.songID);
		if (songToBeDeleted) {
			songToBeDeleted.remove();
			foundAlbum.save(function (err, savedAlbum) {
				if (err) {
					console.log('error saving album: ', err);
				}
				console.log('removed', songToBeDeleted.name, 'from: ', savedAlbum.songs);
				res.json(songToBeDeleted);
			});
		} else {
			res.send(404);
		}
	});
}


module.exports = {
	index: index,
	create: create,
	update: update,
	destroy: destroy
}

