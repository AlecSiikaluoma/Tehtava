import axios from 'axios'


const getAll = async () => {
	const req = await axios.get('/api/movies')
	return req.data
}

const get = async (id) => {
	const req = await axios.get('/api/movies/' + id)
	return req.data
}

const newReview = async (id, review) => {
	const req = await axios.post('/api/movies/' + id + '/review', review)
	return req.data
}

const getAllReviews = async (title) => {
	const req = await axios.get('/api/movies/' + title + '/review')
	return req.data
}

const getRating = async (title) => {
	const req = await axios.get('/api/movies/' + title + '/rating')
	return req.data
}

const getAllUserReviews = async (user) => {
	const req = await axios.get('/api/movies/' + user + '/review/user')
	return req.data
}

export default { getAll, get, newReview, getAllReviews, getRating, getAllUserReviews }