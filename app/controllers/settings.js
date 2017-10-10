module.exports.index = function(app, req, res){

	var settingsModel = new app.app.models.SettingsDAO();

	settingsModel.getSettings(function(error, result){
		console.log(error);
		console.log(result);
		res.render("settings", {settings: result});
	});
}

module.exports.salvar = function(app, req, res){

	var settings = req.body;

	var settingsModel = new app.app.models.SettingsDAO();

	settingsModel.salvarSettings(settings, function(error, result){
		if(error){
			console.log('Erro -> ' + error);
		}
		res.redirect('/');
	});
}