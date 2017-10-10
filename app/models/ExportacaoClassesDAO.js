var fs = require('graceful-fs');

//function SettingsDAO(connection){
//	this._connection = connection;
//}
function ExportacaoClassesDAO(){
	
}

ExportacaoClassesDAO.prototype.getExportacaoConf = function(callback){
	//this._connection.query('select * from noticias order by data_criacao desc', callback);
	var json;
	var exportacaoConf;
	if (fs.existsSync('exportacaoConf.dat')){
		json = fs.readFileSync("exportacaoConf.dat");
	}else{
		json = JSON.stringify({isActive:false});
		fs.writeFile('exportacaoConf.dat', json, 'utf8', callback);
	}
	if(json){
		exportacaoConf = JSON.parse(json);
	}
	callback(null, exportacaoConf);
}

ExportacaoClassesDAO.prototype.salvarExportacaoConf = function(exportacaoConf, callback){
	//this._connection.query('insert into noticias set ? ', noticia, callback)
	var json = JSON.stringify(exportacaoConf);
	fs.writeFile('exportacaoConf.dat', json, 'utf8', callback);
}

module.exports = function(){
	return ExportacaoClassesDAO;
}