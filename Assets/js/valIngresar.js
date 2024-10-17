function validarCampo(){
    let email = document.getElementById("correo");
    let emailVal = email.value.trim();
    let validar = true;
    let valEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!valEmail.test(emailVal)) {
        let mensajeError = document.getElementById("error-correo");
        mensajeError.innerHTML = "Por favor, Ingrese un correo valido";
        mensajeError.style.color = "red";
        validar = false; // El correo no es válido
    } else {
        // Limpiar mensaje de error si el correo es válido
        let mensajeError = document.getElementById("error-correo");
        mensajeError.innerHTML = "";
    }

    // Validación de la contraseña
    let password = document.getElementById("contra"); // Asegúrate que el ID sea correcto
    let passwordVal = password.value.trim(); // Añadido trim() para eliminar espacios

    if (passwordVal === "") {
        let mensajeError = document.getElementById("error-pass");
        mensajeError.innerHTML = "Escriba la contraseña";
        mensajeError.style.color = "red";
        validar = false;
    } else {
        // Limpiar mensaje de error si la contraseña es válida
        let mensajeError = document.getElementById("error-pass");
        mensajeError.innerHTML = "";
    }

    if (validar === true) {

        // Crear un objeto "diccionario" con los valores del formulario
        var dicc_datos = {
            Correo: emailVal,
            Contraseña: passwordVal,
        };

        // se envia la información a la BD por una petición fech
        loginPost(dicc_datos);
        return true
    } else {
        return false
    }
}

function loginPost(dicc_datos) {
    let ladata = new FormData();
    ladata.append("CORREO", dicc_datos.Correo.trim());  // Asegúrate de limpiar espacios
    ladata.append("CONTRASEÑA", dicc_datos.Contraseña.trim());

    // FETCH DE ENVIAR DATOS AL SERVIDOR PARA INICIO DE SESIÓN
    fetch("../db/login.php", {
        method: "POST",
        body: ladata,
    })
    .then(response => response.text())  // Usar text() temporalmente para ver qué responde el servidor
    .then(function(datos) {
        console.log("Respuesta recibida:", datos);  // Ver exactamente qué está recibiendo
        
        try {
            const json = JSON.parse(datos);  // Intentar parsear manualmente
            if (json.rta === 'OK') {
                console.log('Inicio de sesión exitoso');
                window.location.href = "../pages/reservar.html"; // Redirigir al dashboard
            } else {
                alert('Error: ' + json.message);  // Mostrar mensaje de error
            }
        } catch (e) {
            console.error("Error al parsear JSON:", e);
            alert("Error inesperado en el servidor. Intente nuevamente."); // Mensaje más genérico para el usuario
        }
    })
    .catch(function (error) {
        console.error("Error en la petición:", error);
        alert("Error al comunicarse con el servidor. Intente nuevamente."); // Manejo de errores de red
    });
}




$("#botonIngresar").click(function (e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del botón

    const isValid = validarCampo(); // Validar el formulario
    
    if (isValid) {
        // Obtener los datos del formulario
        let dicc_datos = {
            Correo: document.getElementById("correo").value,
            Contraseña: document.getElementById("contra").value
        };

        // Llamar a la función para enviar los datos mediante fetch
        loginPost(dicc_datos);
    } else {
        console.log("Errores en la validación");
    }
});



// Suponiendo que este código se ejecuta después del inicio de sesión
fetch("../db/obtener_datos_usuario.php")
    .then(response => response.json())
    .then(data => {
        if (data.rta === 'OK') {
            mostrarDatosUsuario(data.data); // Llama a la función para mostrar los datos
        } else {
            console.error(data.message); // Manejar el error
        }
    })
    .catch(error => {
        console.error("Error al obtener los datos:", error);
    });


    function mostrarDatosUsuario(datos) {
        // Actualiza el contenido de los elementos con los datos del usuario
        document.getElementById("nombre").textContent = datos.Nombre;
        document.getElementById("apellido").textContent = datos.Apellido;
        document.getElementById("vehiculo").textContent = datos.Modelo; // Asegúrate de que este campo coincida con el modelo que obtuviste
        document.getElementById("placa").textContent = datos.Id_Placa; // Asegúrate de que este campo coincida con la placa que obtuviste
    }
    