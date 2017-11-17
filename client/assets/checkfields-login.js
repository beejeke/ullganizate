
function checkfields() { // Función para la validación de los datos de inicio de sesión.
	if (document.getElementById("email").value.length == 0) { // Comprobación de introducción del email.
		$('#email').css('background-color', '#E82D2D');
		document.getElementById("email").placeholder = "Obligatorio";
	    setTimeout(function() {
	    	document.getElementById("email").placeholder = "correo@mail.xxx";
			$('#email').css('background', 'rgba(255, 255, 255, 0.2)');
		}, 1500);
		return false;
	}

  else if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(document.getElementById("email").value))) {
		document.getElementById("email").value = "";
		$('#email').css('background-color', '#E82D2D');
		document.getElementById("email").placeholder = "Formato incorrecto";
		setTimeout(function() {
			document.getElementById("email").placeholder = "correo@mail.xxx";
			$('#email').css('background', 'rgba(255, 255, 255, 0.2)');
		}, 1500);
		return false;
	}

	else if (document.getElementById("clave").value.length == 0) { // Comprobación de introducción de la contraseña.
		$('#clave').css('background-color', '#E82D2D');
		document.getElementById("clave").placeholder = "Obligatorio";
		setTimeout(function() {
		    document.getElementById("clave").placeholder = "Password";
			$("#clave").css('background', 'rgba(255, 255, 255, 0.2)');
		}, 1500);
		return false;
	}
	return true;
}
