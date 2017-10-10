module.exports.index = function(app, req, res){

	var exportacaoClassesDAO = new app.app.models.ExportacaoClassesDAO();

	exportacaoClassesDAO.getExportacaoConf(function(error, result){
		res.render("exportacao", {exportacaoConf: {}});
	});
}

module.exports.alterar = function(app, req, res){

	var exportacao = req.body;

	var exportacaoClassesDAO = new app.app.models.ExportacaoClassesDAO();

	exportacaoClassesDAO.getExportacaoConf(function(error, result){

	console.log(result);		
		result.isActive = exportacao.is_active;
console.log(result);		

		exportacaoClassesDAO.salvarExportacaoConf(result);
		res.render("exportacao", {exportacaoConf: result});

	});
}