import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import MovieReview from './components/MovieReview'
import UserReviews from './components/UserReviews'

const Main = () => (
	<div>
		<Switch>
		    <Route exact path='/' component={Home} />
		    <Route path='/review/:title' component={MovieReview} />
		    <Route path='/user/review/:user' component={UserReviews} />
    	</Switch>
	</div>
)

export default Main