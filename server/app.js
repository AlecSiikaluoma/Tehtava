var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const fs = require('fs');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
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


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
