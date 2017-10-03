//const fs = require('fs');
var fs = require('graceful-fs');
var mkdirp = require('mkdirp');
var cron = require('node-schedule');

var exportaClasses = function(){

	//Definindo diretório do projeto atual
	//var dirEntrada = 'C:\\workspace\\p2k-corr-14.14.01-d-planoB';
	var dirEntrada = 'C:\\workspace\\plugin-acesso';

	//Definindo diretório de saída das classes compiladas
	var dirSaida = 'C:\\Users\\felipe.constantino\\Desktop\\classes exportadas\\teste';

	var dirPDV;

	//Recupera data atual da tentativa de exportação de classes
	var dataInicio = Date.now();
	var dataUltimaVerificacao = Date.now();

	//Verifica se existe o arquivo de controle para recuperar a data da ultima tentativa de exportação de classes
	if (fs.existsSync('config.dat')){
		dataUltimaVerificacao = fs.readFileSync("config.dat");
	}

	//Definição da function criada para buscar todas as classes compiladas e enviar para o diretório de saída
	var buscaArquivosCompilados = function(path){

		//Retorna todos os arquivos e diretórios dentro do diretório especificado
		fs.readdir(dirEntrada + '\\' + path, (err, files) => {

			//Itera todos os arquivos e diretórios encontrados
			files.forEach(file => {
				
				//recupera os metadatas do diretório/arquivo
				var fileStat = fs.statSync(dirEntrada + '\\' + path + '\\' + file);

				//verifica se é um diretório
				if (fileStat.isDirectory()){
					//Caso seja um diretório, busca as classes compiladas dentro dele.
					buscaArquivosCompilados(path + '\\' + file);
				}else{
					//verifica se houve uma compilação no arquivo encontrado
					if(fileStat.mtime > dataUltimaVerificacao){
						mkdirp(dirSaida + '\\' + path, function (err) {
						    if (err) return cb(err);

						    var stream = fs.createReadStream(dirEntrada + '\\' + path + '\\' + file).pipe(fs.createWriteStream(dirSaida + '\\' + path + '\\' + file));
					  	});
					  	
						//stream.on('finish', function () {
				        //    stream.close();
			        	//});
					}
				}
			});
		});
	};

	//Verifica se no diretório do projeto existe a pasta das classes compildas
	if (fs.existsSync(dirEntrada + '\\bin')){

		//recupera os metadatas do diretório de classes
		var binStat = fs.statSync(dirEntrada + '\\bin');

		//verifica se realmente temos um diretório no caminho especificado
		if(binStat.isDirectory()){

			//Verifica se a data de modificação é maior que a data da ultima tentativa de exportação
			if(binStat.mtime > dataUltimaVerificacao){
				//Notifica que houve uma recompilação do projeto
				console.log('Ocorreu uma compilação total. Favor recompilar os arquivos desejados.');	
			}else{
				//Busca as classes compiladas dentro do projeto especificado
				buscaArquivosCompilados('bin');
			}
		}
	}

	//Grava o arquivo de controle do exportador.
	fs.writeFile('config.dat', dataInicio, function(erro){
		if(erro){
			console.log(erro);
		}
	});

}

exportaClasses();
var rule = new cron.RecurrenceRule();
rule.minute = [0, 5,10,15,20,25,30,35,40,45,50,55];
cron.scheduleJob(rule, function(){
    exportaClasses();
});