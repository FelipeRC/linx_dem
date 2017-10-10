var fs = require('graceful-fs');

//function SettingsDAO(connection){
//	this._connection = connection;
//}
function SettingsDAO(){
	
}

SettingsDAO.prototype.getSettings = function(callback){
	//this._connection.query('select * from noticias order by data_criacao desc', callback);
	var json = fs.readFileSync("settings.dat");
	var settings;
	if(json){
		settings = JSON.parse(json);
	}
	callback(null, settings);
}

SettingsDAO.prototype.salvarSettings = function(settings, callback){
	//this._connection.query('insert into noticias set ? ', noticia, callback)
	var json = JSON.stringify(settings);
	fs.writeFile('settings.dat', json, 'utf8', callback);
}

module.exports = function(){
	return SettingsDAO;
}