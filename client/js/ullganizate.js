$(document).ready(function() {
  //cargar_eventos();
});

// CONTADOR EVENTOS
i = 1;
// COJO EL PRIMER EVENTO COMO PLANTILLA PARA CLONAR.
var auxcontainer=document.getElementById('cd-timeline-block');
function añadir_evento() {
  // FORMATEAMOS LA FECHA FIN FIN PARA OBTENER EL DIA Y EL MES.
  fecha_fin = document.getElementsByName('fecha_fin')[0].value;
  fecha_fin_dia = fecha_fin.substring(8,10);
  fecha_fin_mes = fecha_fin.substring(5,7);
  fecha_fin_mes_aux = fecha_fin_mes;
  
  if (fecha_fin_mes == 01) { fecha_fin_mes = 'ene' } if (fecha_fin_mes == 02) { fecha_fin_mes = 'feb' }
  if (fecha_fin_mes == 03) { fecha_fin_mes = 'mar' } if (fecha_fin_mes == 04) { fecha_fin_mes = 'abr' }
  if (fecha_fin_mes == 05) { fecha_fin_mes = 'may' } if (fecha_fin_mes == 06) { fecha_fin_mes = 'jun' }
  if (fecha_fin_mes == 07) { fecha_fin_mes = 'jul' } if (fecha_fin_mes == 08) { fecha_fin_mes = 'ago' }
  if (fecha_fin_mes == 09) { fecha_fin_mes = 'sep' } if (fecha_fin_mes == 10) { fecha_fin_mes = 'oct' }
  if (fecha_fin_mes == 11) { fecha_fin_mes = 'nov' } if (fecha_fin_mes == 12) { fecha_fin_mes = 'dic' }

  // OBTENEMOS DONDE LO VAMOS, CLONAMOS EL EVENTO AUXILIAR A AÑADIR Y RECORREMOS FECHAS. 
  var recorrer_fechas = document.getElementsByName('fecha_fin_evento_dia[]');
  var container_agregar = document.getElementById('aux');
  var clon = auxcontainer.cloneNode(true);
console.log(recorrer_fechas.length);
  for (var x = 1; x <= recorrer_fechas.length; x++) {
    // MIRAR SI EXISTE LA FECHA
    // 
    // 
    // 
    // 

    console.log(document.getElementsByName('fecha_fin_evento_dia[]')[x].innerHTML);
    if (document.getElementsByName('fecha_fin_evento_dia[]')[x] == fecha_fin_dia && document.getElementsByName('fecha_fin_evento_mes[]')[x] == fecha_fin_mes_aux) {
      // SI EXISTE LO AÑADIMOS Y NO MOSTRAMOS LA FECHA.
      container_agregar.parentNode.appendChild(clon);
      document.getElementById('cd-picture').style.display = "none";
    }
    
    
    
    
    else {
      console.log('else');
      // SI NO HAY OTRO EVENTO CON ESTA FECHA LO AÑADIMOS.
      container_agregar.parentNode.appendChild(clon); 
      document.getElementsByName('cd-timeline-block')[i].style.display = "block";
    }
    document.getElementsByName('fecha_fin_evento_mes[]')[i].innerHTML = fecha_fin_mes;
    document.getElementsByName('fecha_fin_evento_dia[]')[i].innerHTML = fecha_fin_dia;
    document.getElementsByName('titulos_eventos[]')[i].innerHTML =  document.getElementsByName('titulo_evento')[0].value;
    document.getElementsByName('descripcion_eventos[]')[i].innerHTML =  document.getElementsByName('descripcion_evento')[0].value;
    document.getElementsByName('fechas_creacion_eventos[]')[i].innerHTML =  document.getElementsByName('fecha_inicio')[0].value;
    i++;
  }
}
