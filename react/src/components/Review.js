import React from 'react'
import Rating from './Rating'
import { Link } from "react-router-dom";

const Review = ({ review }) => {
	return(
		<div href="#" class="list-group-item flex-column align-items-start user-review">
			<div class="d-flex w-100 justify-content-between">
				<Link to={'/user/review/' + review.user} ><h5 class="mb-1">{review.user}</h5></Link>
				</div>
		        <p class="mb-1">{review.review}.</p>
			    <Rating rating={review.rating} active={false} />
		</div>
	)
}

export default Review
