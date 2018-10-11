import React from 'react'
import Rating from './Rating'
import { Link, Router, Route } from "react-router-dom";
import moviesService from '../services/movies'
import Review from './Review'

class MovieReview extends React.Component {

	constructor(props) {
    	super(props)
    	this.state = {
    		movie: {},
    		name: '',
    		review: '',
    		rating: 0,
    		reviews: [],
    		average_rating: 0
    	}
	}

	componentDidMount() {
		moviesService.get(this.props.match.params.title).then(movie => {
			this.setState({movie : movie})
		})
		moviesService.getAllReviews(this.props.match.params.title).then(reviews => {
			this.setState({reviews :  reviews})
		})
		moviesService.getRating(this.props.match.params.title).then(data => 
      		this.setState({average_rating : data.rating})
    	)
  	}

  	handleSubmit(event) {
  		event.preventDefault();
  		let review = {
  			name: this.state.name,
  			review: this.state.review,
  			rating: this.state.rating,
  			movie: this.state.movie.title
  		}
  		moviesService.newReview(this.state.movie.title, review).then(back => {
  			this.setState({reviews: [...this.state.reviews, back]})
  		})
  		this.setState({name :  ''})
  		this.setState({review :  ''})
  		this.setState({rating :  0})

  	}

  	handleNameChange(event) {
		this.setState({name: event.target.value});	
  	}

  	handleReviewChange(event) {
		this.setState({review: event.target.value});
  	}

  	rate(rating) {
  		this.setState({rating: rating})
  	}

	render() {

		var averageRatingText = ""
		if(this.state.average_rating > 0) {
        	averageRatingText = this.state.average_rating;
      	}
      	if(this.state.average_rating == 0 || this.state.average_rating == undefined) {
      		averageRatingText = "Unrated"
      	}

		return(
			<div class="review-movie">
			<div class="container">
	              <div class="card mb-10 shadow-sm review-movie-card">
		              <div class="row">
		              	<div class="col-md-12">
  							<button type="button" onClick={() => this.props.history.goBack()} class="btn btn-secondary btn-sm back-btn">&#8249; Back</button>
  						</div>
  						{ this.state.movie.img != undefined ? (<div class="col-md-6 text-center"><img class="review-movie-img" src={'http://localhost:3001' + this.state.movie.img} /></div>) : <span></span> }
		              	<div class="col-md-6">
		              	<div class="review-movie-info">
		                    <div class="d-flex justify-content-between align-items-center movie-average-rating review-average-rating">
		                  		<span class="text-muted average"><span class="average-star">☆</span><span class="badge badge-pill badge-light">{averageRatingText}</span></span>
		                    </div>
		                    <h3 class="card-title">{this.state.movie.title}  <span class="movie-year">({this.state.movie.year})</span></h3>
		              		<p class="card-text">{this.state.movie.description}</p>
		              		<div class="d-flex justify-content-between align-items-center">
	                  			<small class="text-muted">{this.state.movie.director}</small>
	                    		<small class="text-muted">{this.state.movie.length} min</small>
	                  		</div>
	                  	</div>
	              	</div>
	              </div>
	                <div class="card-body review">

	                <hr />

	                <div class="col-md-8 offset-md-2 card your-review">
					  <div class="card-body">
					  <h5><b>Submit your review:</b></h5>

					    <b>Rate movie:</b>
                    	<Rating rating={this.state.rating} change={(rating) => this.rate(rating)} active={true} />

	                	<form class="review-form" onSubmit={this.handleSubmit.bind(this)}>
							<div class="form-group">
						   		<label for="exampleFormControlInput1">Name</label>
						   		<input class="form-control" value={this.state.name} onChange={this.handleNameChange.bind(this)} placeholder="Your name" />
							</div>
							<div class="form-group">
						   		<label for="exampleFormControlTextarea1">Your review</label>
						   		<textarea class="form-control" value={this.state.review} onChange={this.handleReviewChange.bind(this)} id="exampleFormControlTextarea1" rows="3"></textarea>
							</div>
							<button type="submit" class="btn btn-primary">Submit</button>
					 	</form>
					 </div>


					  </div>

					{ this.state.reviews.length > 0 ? (<hr />) : <span></span> }
	                <div class="col-md-8 offset-md-2">

	                { this.state.reviews.length > 0 ? (<h3>Reviews:</h3>) : <span></span> }
	                <div class="list-group">
	                	{
	                		this.state.reviews.map(r => 
	                			<Review review={r} />
	                		)
	                	}
					</div>
				</div>
			</div>
        </div>
        </div>
        </div>
		)

	}

}

export default MovieReview;