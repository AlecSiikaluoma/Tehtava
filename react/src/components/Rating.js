import React from 'react'

class Rating extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			rating: this.props.rating,
		}
	}

	rate(num) {
		if(this.props.active) {
			this.setState({rating: num})
			this.props.change(num)
		}
	}

	render() {
		var rating = [];

		for(var i = 1; i <= 5; i++) {
			var colored = "not-colored";

			if(this.state.rating >= i) {
				colored = "colored"
			}

			rating.push(<span className={colored} onClick={this.rate.bind(this,i)}>☆</span>)
		}

		rating.reverse()

		var cklass = "star rating"

		if(!this.props.active) {
			cklass = "unactive-rating"
		}

		return (
			<div className={cklass}>
				{rating}
			</div>
		)
	}

}

export default Rating
