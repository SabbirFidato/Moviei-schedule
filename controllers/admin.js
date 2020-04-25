var express = require('express');
var router = express.Router();

var showTimeModel = require.main.require('./models/showtime-model');

var validationRules = require.main.require('./validation_rules/rules');
var asyncValidator = require('async-validator');

router.get('/', function(req, res){

	showTimeModel.getTheaters(function(result){
		var data = {
			theaterList: result
		};
		res.render('admin/index', data);
	});

});




router.get('/create', function(req, res){
	//res.render('admin/createnew/create', {errs: []});

		showTimeModel.getTheaters(function(result){
			var data = {
				theaterList: result,
				errs: []
			};
			res.render('admin/createnew/create', data);
		});
});




router.post('/create', function(req, res){

	var rules = validationRules.admin.createNewMovie;

	var data = {
		movieName: req.body.mname,
		//theaterName: req.body.tname,
		times: req.body.times,
	};


	var validator = new asyncValidator(rules);

	validator.validate(data, function(errors, fields){
		if(!errors)
		{
			showTimeModel.insertNewMovie(req.body.mname, req.body.tname, req.body.times, function(obj){
			
			showTimeModel.newMovie(req.body.mname, function(obj){
				res.redirect('/admin');
				});

			});
		}
		else
		{
			showTimeModel.getTheaters(function(result){
			var data = {
				theaterList: result,
				errs: errors
			};
			console.log(fields);
			res.render('admin/createnew/create', data);

			});

		}
	});

});


router.get('/reschedule/:theatername', function(req, res){
	var theatername = req.params.theatername;
	showTimeModel.getShowTimes(theatername, function(result){

				var data = {
				pageName:theatername,
				showDetails: result, 
				errs: []
			};

			//console.log(data.showDetails);
		res.render('admin/reschedule/reschedule', data);
	});
});


router.get('/reschedule/:pageName/:id', function(req, res){
	
	//var theatername = req.params.theatername;
	var showId = req.params.id;

	showTimeModel.getMovieDetails(showId, function(result){

				var data = {
				details: result, 
				errs: []
			};

			console.log(data.details);

		res.render('admin/reschedule/edit', data);
	});
});


router.post('/reschedule/:pageName/:id', function(req, res){
	
	var newRoutine = {
		id: req.body.scheduleid,
		movieName: req.body.mname,
		theaterName: req.body.tname,
		time: req.body.time,
	};

	var rules = validationRules.admin.edit;

	var validator = new asyncValidator(rules);

	validator.validate(newRoutine, function(errors, fields){
		if(!errors)
		{
			showTimeModel.updateRoutine(newRoutine, function(obj){
				res.redirect('/admin/reschedule/'+req.body.tname);
			});
		}
		else
		{

			//res.render("'/admin/reschedule/"+req.body.tname+"/"+newRoutine.id+"'", {newRoutine, errs: errors});
		}
	});

});




module.exports = router;