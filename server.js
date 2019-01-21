var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');

var controllers = require('./controllers');

// generate a new express app
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept datatypes
app.use(bodyParser.urlencoded({ extended: true }));

// define a root route: localhost:3000/
app.get('/', function (req, res) {
	res.sendFile('views/index.html', { root : __dirname });
})

app.get('/api', controllers.api.index);
app.get('/api/albums', controllers.albums.index);
app.post('/api/albums', controllers.albums.create);
app.get('/api/albums/:id', controllers.albums.show);
app.put('/api/albums/:id', controllers.albums.update);
app.delete('/api/albums/:id', controllers.albums.destroy);


app.listen(process.env.PORT || 3000, function() {
	console.log('Tunesly app listening on http://localhost:3000/');
});






