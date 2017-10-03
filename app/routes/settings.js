module.exports = function(app){
	app.get('/settings', function(req, res){
		app.app.controllers.settings.index(app, req, res);
	});
};
