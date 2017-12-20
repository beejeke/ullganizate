var fecha = function(date) {
  var dia = date.getDate();
  var mes = date.getMonth() + 1;
  var año = date.getFullYear();
  if(dia < 10) dia = "0" + dia;
  if(mes < 10) mes = "0" + mes;
  return ""+ año + "-" + mes + "-" + dia;
}

module.exports = fecha;
