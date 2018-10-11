var express = require('express');
var bodyParser = require('body-parser')
var app = express();

const fs = require('fs');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
   res.send('Index');
})

// Get all movies from a movie JSON file
app.get('/api/movies', function (req, res) {
	// Data is stored in these json files
	var movies = JSON.parse(fs.readFileSync('movies.json')); 
	res.json(movies);
})

// Get an average rating for a movie with a given name
app.get('/api/movies/:title/rating', function (req, res) {

	var title = req.params.title
	let reviews = JSON.parse(fs.readFileSync('review.json'))
	let reviewsForMovie = reviews.filter(function (a) {
		return a.movie == title
	})

	var c = 0;
	reviews.forEach(function (a) {
		if(a.movie == title) {
			c += a.rating
		}
	});
	c /= reviewsForMovie.length
	let out = {
		"rating":c,
	}

	res.json(out)
})

// Get a movie from movie JSON file
app.get('/api/movies/:title', function (req, res) {
	var movies = JSON.parse(fs.readFileSync('movies.json'));
	var id = req.params.title;
	var movie = movies.filter(function (a) {
  		return a.title == id
	});
	res.json(movie[0]);
})

// Get all reviews for a movie
app.get('/api/movies/:title/review', function (req, res) {
	var title = req.params.title
	let reviews = JSON.parse(fs.readFileSync('review.json'))
	let reviewsForMovie = reviews.filter(function (a) {
		return a.movie == title
	})
	res.json(reviewsForMovie)
})

// Adds a new review to reviews JSON file. If user with given username doesn't exists, add a new one.
app.post('/api/movies/:title/review', function (req, res) {
	var id = req.params.title


	// Find user who did it or add a new one
	let usersFound = findUser(req.body.name);
	if(usersFound.length == 0) {
		var data = fs.readFileSync('users.json');
		var us = JSON.parse(data);
		us.push({name: req.body.name })
		data = JSON.stringify(us)
		fs.writeFile('users.json', data, 'utf8', {});
	}

	let newReview = {
		user: req.body.name,
		movie: req.body.movie,
		review: req.body.review,
		rating: req.body.rating
	}
	// Add Review
	var reviewsData = fs.readFileSync('review.json');
	var reviews = JSON.parse(reviewsData);
	reviews.push(newReview)
	newData = JSON.stringify(reviews)
	fs.writeFile('review.json', newData, 'utf8', {});

	res.json(newReview)
})


app.get('/api/movies/:user/review/user', function (req, res) {
	var data = JSON.parse(fs.readFileSync('review.json'));
	var id = req.params.user;
	var reviews = data.filter(function (a) {
  		return a.user == id
	});
	res.json(reviews);
})

function findUser(name) {
	var users = JSON.parse(fs.readFileSync('users.json'))
	var usrs = users.filter(function (a) {
		return a.name == name
	});
	return usrs
}
   
var server = app.listen(3001, function () {
   var host = server.address().address
   var port = server.address().port
            
   console.log("Example app listening at http://%s:%s", host, port)
})
