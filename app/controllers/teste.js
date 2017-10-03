const fs = require('fs');

var dirEntrada = 'C:\\workspace\\p2k-corr-14.14.01-d-planoB';
var dirSaida = 'C:\\Users\\felipe.constantino\\Desktop\\classes exportadas\\teste';

console.log('dirEntrada -> ' + dirEntrada);
console.log('dirSaida -> ' + dirSaida);

var exists = false;

dirEntrada += '\\bin\\'

var buscaArquivosCompilados = function(path){
	if (fs.existsSync(path)){
		fs.readdir(path, (err, files) => {
			files.forEach(file => {
				
				if(file.isDirectory()){
					if (!fs.existsSync(dirSaida + '\\' +file)){
						fs.mkdirSync(dirSaida + '\\' +file);
					}
					buscaArquivosCompilados(dirSaida + '\\' +file);
				}else{
					console.log(file);
				}				
			});
		});
	};
}

buscaArquivosCompilados(dirEntrada);




