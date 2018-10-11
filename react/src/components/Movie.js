import React from 'react'
import Rating from './Rating'
import { Link } from "react-router-dom";
import movieService from '../services/movies'


class Movie extends React.Component {

  constructor() {
    super()
    this.state = {
      rating: 0,
    }
  }

  componentDidMount() {
    movieService.getRating(this.props.movie.title).then(data => 
      this.setState({rating : data.rating})
    )
  }

  render() {

      var averageRatingText;
      if(this.state.rating > 0) {
        averageRatingText = this.state.rating;
      } else {
        averageRatingText = "Unrated";
      }

      return(
        <div class="col-md-4">
          <div class="card mb-4 shadow-sm">
            <img class="movie-img-top" src={"http://localhost:3001" + this.props.movie.img} />
            <div class="card-body">
              <h3 class="card-title">{this.props.movie.title}  <span class="movie-year">({this.props.movie.year})</span></h3>
              <p class="card-text preview-description">{this.props.movie.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">{this.props.movie.director}</small>
                <small class="text-muted">{this.props.movie.length} min</small>
              </div>
              <div class="d-flex justify-content-between align-items-center movie-average-rating">
                <span class="text-muted average"><span class="average-star">☆</span><span class="badge badge-pill badge-light">{averageRatingText}</span></span>
              </div>
              <hr />
              <div class="review-btn btn-group">
                <Link to={'/review/' + this.props.movie.title} ><button type="button" class="btn btn-sm btn-outline-secondary">Review</button></Link>
              </div>
            </div>
          </div>
        </div>
      )
  }
}

export default Movie;
