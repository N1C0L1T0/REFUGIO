function validarCampo(){
    let email = document.getElementById("user[email]");
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
    let password = document.getElementById("user[password]"); // Asegúrate que el ID sea correcto
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

    return validar
}

$("#botonIngresar").click(function (e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del botón

    const isValid = validarCampo(); // Validar el formulario
    
    if (isValid) {
        // Si la validación es exitosa, enviar el formulario o realizar otra acción
        console.log("BIEN")
        document.getElementById("miFormulario").submit(); // Para enviar el formulario
        
        // o puedes hacer otra acción, como mostrar un mensaje de éxito.
    } else {
        // Manejo de errores, ya se hace en la función de validación
        console.log("Errores en la validación");
    }
});