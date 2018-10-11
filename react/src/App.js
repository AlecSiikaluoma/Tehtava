import React, { Component } from 'react';
import './App.css';
import MoviesList from './components/MoviesList';
import MovieReview from './components/MovieReview';
import Main from './Main'

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			movies: []
		}
	}

	render() {
	  return (
	    <div className="App">
	      <Main />
	    </div>
	   );
	}
}

export default App;
