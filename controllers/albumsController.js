
var albums = [{
  _id: 132,
  artistName: 'Nine Inch Nails',
  name: 'The Downward Spiral',
  releaseDate: '1994, March 8',
  genres: [ 'industrial', 'industrial metal' ]
}, {
  _id: 133,
  artistName: 'Metallica',
  name: 'Metallica',
  releaseDate: '1991, August 12',
  genres: [ 'heavy metal' ]
}, {
  _id: 134,
  artistName: 'The Prodigy',
  name: 'Music for the Jilted Generation',
  releaseDate: '1994, July 4',
  genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ]
}, {
  _id: 135,
  artistName: 'Johnny Cash',
  name: 'Unchained',
  releaseDate: '1996, November 5',
  genres: [ 'country', 'rock' ]
}];


function index(req, res) {
	db.Album.find( function(err, allAlbums) {
		if(err) {
			console.log('index error: ' + err);
			res.sendStatus(500);
		}
		res.json(allAlbums);
	})

}


function create(req, res) {
	// create new album with data
	var newAlbum = new db.Album({
		name: req.body.name,
		image: req.body.image,
		releaseDate: req.body.releaseDate,
	});
	// db.Album.findOne({name: req.body.name,
	//  image: req.body.image,
	//   releaseDate: req.body.releaseDate}, function(err, newAlbum) {

	//   })
	newAlbum.save(function (err, newAlbumInDb) {
		res.json(newAlbumInDb);
	});
}

function show(req, res) {
	var albumId = req.params.id
	db.Album.findById(albumId, function(err, locateAlbum) {
		res.json(locateAlbum);
	});
}

function update(req, res) {
	var albumId = req.params.id
	db.Album.findByIdAndUpdate(albumId, function(err, updatedAlbum) {
		name: req.body.name,
		image: req.body.image,
		releaseDate: req.body.releaseDate
	})
	res.json(updatedAlbum);
}

function destroy(req, res) {
	var albumId = req.params.id;
	db.Album.findByIdAndRemove(albumId, function(err, deletedAlbum) {
		res.json(deletedAlbum);
	});
}

module.exports = {
	index: index,
	create: create,
	show: show,
	destroy: destroy,
	update: update
};


