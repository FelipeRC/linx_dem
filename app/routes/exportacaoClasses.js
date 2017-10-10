module.exports = function(app){
	app.get('/exportacaoClasses', function(req, res){
		app.app.controllers.exportacaoClasses.index(app, req, res);
	});

	app.post('/exportacao/alterar', function(req, res){
		app.app.controllers.exportacaoClasses.alterar(app, req, res);
	});
};
