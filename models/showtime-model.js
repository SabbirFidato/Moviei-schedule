var db = require('./db');
module.exports = {
	getTheaters: function(callback){
		var sql = "SELECT * FROM theaters";
		db.executeQuery(sql, null, function(result){
			callback(result);
		});
	},

	
	getMovieDetails: function(id, callback){
		var sql = "SELECT * FROM showtime WHERE id=?";
		db.executeQuery(sql, [id], function(result){
			callback(result[0]);
		});
	},

	getShowTimes: function(tname, callback){
		var sql = "SELECT * FROM showtime WHERE theater=?";
		db.executeQuery(sql, [tname], function(result){
			callback(result);
		});
	},

	
	insertNewMovie: function(name, theater, times, callback){
		var sql1 = "INSERT INTO showtime VALUES (null, ?, ?, ?)";

		db.executeQuery(sql1, [name, theater, times], function(result){
			callback(result);
		});
	},

	newMovie: function(name, callback){
		var sql = "INSERT INTO movies VALUES (null, ?)";

		db.executeQuery(sql, [name], function(result){
			callback(result);
		});
	},


	updateRoutine:function(newData, callback){
		var sql = "UPDATE showtime SET movie=?, theater=?, times=? WHERE id=?";
		db.executeQuery(sql, [newData.movieName, newData.theaterName, newData.time, newData.id], function(result){
			callback(result);

			console.log(newData);
		});
	}
};