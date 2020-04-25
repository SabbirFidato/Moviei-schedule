module.exports = {

	admin: {
		createNewMovie : {
			
			movieName: {required: true, message: 'Movie name cannot be empty'},
			times: {required: true, message: 'Time cannot be empty'}
		},

		edit: {
			movieName: {required: true},
			theaterName: {required: true},
			time: {required: true}
		}

	}
};