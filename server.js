var express = require('express')
var app = express()
var path = require('path')

app.get('/',function(req,res){

     res.sendFile(path.join(__dirname+'/client/index.html'));

});

app.use('/', express.static(path.join(__dirname, './')));

  var server = app.listen(process.env.PORT || 8087, ()=> {
	var host = server.address().address
	var port = server.address().port

	console.log('Conectado al puerto 8087')
})
