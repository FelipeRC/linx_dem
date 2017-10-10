module.exports = function(app){
	app.get('/settings', function(req, res){
		app.app.controllers.settings.index(app, req, res);
	});

	app.post('/settings/salvar', function(req, res){
		app.app.controllers.settings.salvar(app, req, res);
	});
};
