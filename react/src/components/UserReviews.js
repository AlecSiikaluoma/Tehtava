import React from 'react'
import Rating from './Rating'
import { Link, Router, Route } from "react-router-dom";
import moviesService from '../services/movies'


const Review = ({ review }) => {
	return(
		<div href="#" class="list-group-item flex-column align-items-start user-review">
			<div class="d-flex w-100 justify-content-between">
				<h5 class="mb-1">{review.movie}</h5>
				</div>
		        <p class="mb-1">{review.review}.</p>
			    <Rating rating={review.rating} active={false} />
		</div>
	)
}

class UserReviews extends React.Component {

	constructor(props) {
    	super(props)
    	this.state = {
    		reviews: []
    	}
	}

	componentDidMount() {
		moviesService.getAllUserReviews(this.props.match.params.user).then(reviews => {
			console.log(reviews)
			this.setState({reviews :  reviews})
		})
  	}

	render() {
		return (
			<div class="container user-reviews">
				<button type="button" onClick={() => this.props.history.goBack()} class="btn btn-secondary btn-sm back-btn">&#8249; Back</button>
				<h3>All review for user: <b>{this.props.match.params.user}</b></h3>
				<div class="list-group">
			        {
			            this.state.reviews.map(r => 
			                <Review review={r} />
			             )
			        }
				</div>
			</div>
		)
	}
}

export default UserReviews;