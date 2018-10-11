import React from 'react'
import Movie from './Movie'
import movieService from '../services/movies'

class MoviesList extends React.Component {

	constructor() {
		super()
		this.state = {
			movies: [],
		}
	}

	componentDidMount() {
		movieService.getAll().then(movies => 
			this.setState({movies : movies})
		)
	}

	render() {

		return(
			<div class="movies-list">
				<div class="container">
					<div class="row">
					{
						this.state.movies.map(movie => 
							<Movie key={movie.id} movie={movie} />
						)
					}
					</div>
				</div>
			</div>

		)

	}

}

export default MoviesList;