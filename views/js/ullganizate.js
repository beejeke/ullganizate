$(document).ready(function() {
  //cargar_eventos();
});


function añadir_evento() {
  
  fecha_fin = document.getElementsByName('fecha_fin')[0].value;
  fecha_fin_dia = fecha_fin.substring(8,10);
  fecha_fin_mes = fecha_fin.substring(5,7);
  if (fecha_fin_mes == 01) { fecha_fin_mes = 'ene' } if (fecha_fin_mes == 02) { fecha_fin_mes = 'feb' }
  if (fecha_fin_mes == 03) { fecha_fin_mes = 'mar' } if (fecha_fin_mes == 04) { fecha_fin_mes = 'abr' }
  if (fecha_fin_mes == 05) { fecha_fin_mes = 'may' } if (fecha_fin_mes == 06) { fecha_fin_mes = 'jun' }
  if (fecha_fin_mes == 07) { fecha_fin_mes = 'jul' } if (fecha_fin_mes == 08) { fecha_fin_mes = 'ago' }
  if (fecha_fin_mes == 09) { fecha_fin_mes = 'sep' } if (fecha_fin_mes == 10) { fecha_fin_mes = 'oct' }
  if (fecha_fin_mes == 11) { fecha_fin_mes = 'nov' } if (fecha_fin_mes == 12) { fecha_fin_mes = 'dic' }
  
  document.getElementsByName('fecha_fin_evento_mes[]')[0].innerHTML = fecha_fin_mes;
  document.getElementsByName('fecha_fin_evento_dia[]')[0].innerHTML = fecha_fin_dia;
  document.getElementsByName('titulos_eventos[]')[0].innerHTML =  document.getElementsByName('titulo_evento')[0].value;
  document.getElementsByName('descripcion_eventos[]')[0].innerHTML =  document.getElementsByName('descripcion_evento')[0].value;
  document.getElementsByName('fechas_creacion_eventos[]')[0].innerHTML =  document.getElementsByName('fecha_inicio')[0].value;
}
