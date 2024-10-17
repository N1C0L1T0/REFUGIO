//================================================================================================================
// ACA EMPIEZA LAS VALIDACIONES DEL WIZARD
//================================================================================================================

// Función para validar los capos del formulario
function validarCampo(pasoActual) {

    let errores = []; // array para almacenar los errores

    // Obtener valores del formulario
    let valCorreo = document.getElementById("correo").value.trim();             // obtengo correo
    let password = document.getElementById("contra").value.trim();              // obtengo contraseña
    let nombre1 = document.getElementById("nombre").value.trim()                // obtengo nombre
    let apellido1 = document.getElementById("apellido").value.trim();           // obtengo apellido
    let numero1 = document.getElementById("telefono").value.trim();             // obtengo telefono
    let tipoVehiculo1 = document.getElementById("tipoVehiculo").value.trim();   // obtengo tipo de vehiculo
    let modelo1 = document.getElementById("modelo").value.trim();               // obtengo modelo del vehiculo
    let placa1 = document.getElementById("placa").value.trim();                 // obtengo placa del vehiculo

    // Ajuste de datos para almacenar
    // Convertir el nombre y apellido a capitalizar
    nombre1 = nombre1.charAt(0).toUpperCase() + nombre1.slice(1).toLowerCase();
    apellido1 = apellido1.charAt(0).toUpperCase() + apellido1.slice(1).toLowerCase();

    // Convertir placa y modelo a mayúsculas
    placa1 = placa1.toUpperCase();
    modelo1 = modelo1.toUpperCase();

    // Asignar los valores transformados de nuevo a los campos
    $("#nombre").val(nombre1);
    $("#apellido").val(apellido1);
    $("#placa").val(placa1);
    $("#modelo").val(modelo1);


    // Variables de validación
    const valEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // para email - Expresión regular para obtener un email
    const uu = /^[a-zA-ZÀ-ÿ]+$/;                   // para nombre - Expresión regular para una sola palabra con letras
    const valApellido = /^[a-zA-ZÀ-ÿ]+$/;          // para apellido - Expresión regular para una sola palabra con letras
    const regex = /^[A-Za-z]{3}[A-Za-z0-9]{3}$/;   // para placa - Expresión regular para 3 primeras solo letras y las otras 3 letras y num


    if (pasoActual === '1. Cuenta') {
        
        // Validar email
        if (!valEmail.test(valCorreo)) {
            let mensajeError = document.getElementById("error-correo");
            mensajeError.innerHTML = "Por favor, Ingrese un correo valido";
            mensajeError.style.color = "red";
            errores.push("error-correo"); // El correo no es válido
        } else {
            // Limpiar mensaje de error si el correo es válido
            let mensajeError = document.getElementById("error-correo");
            mensajeError.innerHTML = "";
        }

        // Validación de la contraseña
        if (password.length < 6 || password === "") {
            let mensajeError = document.getElementById("error-pass");
            mensajeError.innerHTML = "La contraseña debe tener al menos 6 caracteres";
            mensajeError.style.color = "red";
            errores.push("error-pass"); // La contraseña no es válida
        } else {
            // Limpiar mensaje de error si la contraseña es válida
            let mensajeError = document.getElementById("error-pass");
            mensajeError.innerHTML = "";
        }

        if (errores.length === 0) {
            return true
        } else {
            errores.length = 0;
            return false
        }

    } 
    
    if (pasoActual === '2. Perfil') {
        
        //Validar nombre
        if (!nombre1.match(uu) || nombre1 === "") {
            let mensajeError = document.getElementById("error-nom");
            mensajeError.innerHTML = "Por favor, Ingrese un nombre valido, solo UNO";
            mensajeError.style.color = "red";
            errores.push("error-nom"); // La contraseña no es válida
        } else {
            // Limpiar mensaje de error si la contraseña es válida
            let mensajeError = document.getElementById("error-nom");
            mensajeError.innerHTML = "";
        }

        //Validad apellido
        if (!valApellido.test(apellido1) || apellido1 === "") {
            let mensajeError = document.getElementById("error-ape");
            mensajeError.innerHTML = "Por favor, Ingrese un apellido valido, Solo UNO";
            mensajeError.style.color = "red";
            errores.push("error-ape"); // Agrega el error a la lista
        } else {
            // Limpiar mensaje de error si el apellido es válido
            let mensajeError = document.getElementById("error-ape");
            mensajeError.innerHTML = "";
        }

        // Valida numero de telefono 
        if (numero1 === "" || numero1.length !== 10) {
            let mensajeError = document.getElementById("error-tel");
            mensajeError.innerHTML = "Por favor, Ingrese un telefono valido";
            mensajeError.style.color = "red";
            errores.push("error-tel"); // Agrega el error a la lista
        } else {
            // Limpiar mensaje de error si el apellido es válido
            let mensajeError = document.getElementById("error-tel");
            mensajeError.innerHTML = "";
        }

        // Retornar true solo si hay cero errores
        if (errores.length === 0) {
            return true
        } else {
            errores.length = 0;
            return false
        }
    
    }

    if (pasoActual === '3. Vehiculo') {

        // Valida modelo 
        if (modelo1 === "") {
            let mensajeError = document.getElementById("error-model");
            mensajeError.innerHTML = "Por favor, Ingrese un modelo valido";
            mensajeError.style.color = "red";
            console.log("error en modelo");
            errores.push("error-model"); // Agrega el error a la lista
        } else {
            // Limpiar mensaje de error si el modelo es válido
            let mensajeError = document.getElementById("error-model");
            mensajeError.innerHTML = "";
        }

        // valida placa
        if (!regex.test(placa1) || placa1.length !== 6) {
            let mensajeError = document.getElementById("error-placa");
            mensajeError.innerHTML = "La placa debe tener exactamente 6 caracteres sin espacios, los primeros 3 letras y los últimos 3 pueden ser letras o números.";
            mensajeError.style.color = "red";
            console.log("error en placa");
            errores.push("error-placa"); // Agrega el error a la lista
        } else {
            // Limpiar mensaje de error si es válida
            let mensajeError = document.getElementById("error-placa");
            mensajeError.innerHTML = "";
        }

        // Retornar true solo si hay cero errores
        if (errores.length === 0) {

            // Crear un objeto "diccionario" con los valores del formulario
            var dicc_datos = {
                Correo: valCorreo,
                Contraseña: password,
                Nombre: nombre1,
                Apellido: apellido1,
                Telefono: numero1,
                TipoVehiculo: tipoVehiculo1,
                Modelo: modelo1,
                Placa: placa1
            };

            // se envia la información a la BD por una petición fech
            registrarPost(dicc_datos);

            return true
        } else {
            errores.length = 0;
            return false
        }
    }
}

// función para realizar petición fetch, enviar peticiones HTTP al servidor (PETICIÓN POST ENVIAR REGISTRO)
function registrarPost(dicc_datos) {

    let ladata = new FormData();
    ladata.append("CORREO", dicc_datos.Correo); 
    ladata.append("CONTRASEÑA", dicc_datos.Contraseña);
    ladata.append("NOMBRE", dicc_datos.Nombre); 
    ladata.append("APELLIDO", dicc_datos.Apellido); 
    ladata.append("TELEFONO", dicc_datos.Telefono); 
    ladata.append("TIPOVEHICULO", dicc_datos.TipoVehiculo); 
    ladata.append("MODELO", dicc_datos.Modelo); 
    ladata.append("PLACA", dicc_datos.Placa); 

    // FETCH DE INGRESAR DATOS A LA BD
    fetch("../db/registro.php", {
        method: "POST",
        body: ladata,
    })
    .then(response => response.json()) // Convierte la respuesta en JSON
    .then(function(datos) {
        const errorMessageSpan = document.getElementById('error-message');
        errorMessageSpan.textContent = ''; // Limpiar mensaje anterior
    
        if (datos.rta === "OK") {
            console.log("Datos insertados correctamente");
            // Aquí podrías redirigir a la página de éxito
            window.location.href = "../pages/registro_exitoso.html";
        }
        if (datos.rta === "ERROR") {
            alert("Ups, " + datos.message);
            // Mostrar el mensaje de error en el span
            errorMessageSpan.textContent = datos.message;
            errorMessageSpan.style.display = 'block'; // Asegúrate de mostrar el span
        }
    })
    .catch(function (error) {
        console.error(error);
        // Aquí también podrías mostrar un mensaje de error genérico si es necesario
    });
    

}

// Suponiendo que este código se ejecuta después del registro
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
    


// funcion para cuando de click en el primer paso
$("#next1-button").click(function (e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del botón

    const pasoActual = wizard.getCurrentStep().label;

    const isValid = validarCampo(pasoActual); // Validar el formulario

    if (isValid) {
        // Cambiar al siguiente paso usando el método del wizard
        wizard.revealStep('2. Perfil'); // Cambia al siguiente paso (asegúrate de usar el nombre correcto)
        onStepChange(wizard, 'steps-native'); // Actualiza la navegación
    } else {
        // Aquí puedes mostrar un mensaje de error si es necesario
    }
});

// funcion para cuando de click en el paso segundo
$("#next2-button").click(function (e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del botón

    const pasoActual = wizard.getCurrentStep().label;
    console.log(pasoActual);
    const isValid = validarCampo(pasoActual); // Validar el formulario
    
    if (isValid) {
        // Cambiar al siguiente paso usando el método del wizard
        wizard.revealStep('3. Vehiculo'); // Cambia al siguiente paso (asegúrate de usar el nombre correcto)
        onStepChange(wizard, 'steps-native'); // Actualiza la navegación
    } else {
        // Aquí puedes mostrar un mensaje de error si es necesario
    }
});





//================================================================================================================
// ACA EMPIEZA LAS FUNCIONALIDADES DEL WIZARD 
//================================================================================================================

/**
 * buildStepsBreadcrumb - Crea una barra de navegación tipo breadcrumbs basada en los pasos de un wizard.
 * 
 * @param {Object} wizard - Objeto controlador del wizard, que contiene la lógica para gestionar los pasos.
 * @param {string} element - ID del elemento HTML donde se insertará la barra de navegación.
 * @param {Object} steps - Objeto que contiene los pasos del wizard. Cada propiedad es un paso con un nombre y un estado (activo o inactivo).
 */
function buildStepsBreadcrumb(wizard, element, steps) {
    
    // Obtener el contenedor de los breadcrumbs usando el ID proporcionado
    const $steps = document.getElementById(element);

    // Limpiar el contenido actual del contenedor de breadcrumbs
    $steps.innerHTML = '';

    // Iterar sobre cada propiedad (etiqueta) dentro del objeto de pasos
    for (let label in steps) {

        // Verificar que el paso sea una propiedad propia del objeto (no heredada)
        if (steps.hasOwnProperty(label)) {

            // Crear el elemento <li> que será un elemento de la lista de navegación
            const $li = document.createElement('li');
            
            // Crear el elemento <a> que será el enlace dentro del elemento <li>
            const $a = document.createElement('a');
            
            // Añadir la clase 'nav-item' al <li> para darle estilo de navegación
            $li.classList.add('nav-item');
            
            // Añadir la clase 'nav-link' al <a> para aplicarle estilo de enlace de navegación
            $a.classList.add('nav-link');
            
            // Si el paso actual está activo, añadir la clase 'active' al enlace
            if (steps[label].active) {
                $a.classList.add('active');
            }

            // Configurar el atributo 'href' del enlace para que sea un vínculo sin acción real
            $a.setAttribute('href', '#');

            // Establecer el texto del enlace al nombre del paso (la etiqueta)
            $a.innerText = label;

            // Agregar un evento al enlace para gestionar el cambio de paso en el wizard cuando se hace clic
            $a.addEventListener('click', e => {
                // Prevenir el comportamiento predeterminado del enlace (navegación)
                e.preventDefault();

                const pasoActual = wizard.getCurrentStep().label;

                const isValid = validarCampo(pasoActual);

                if (isValid) {
                // Llamar a la función del wizard para revelar el paso correspondiente    
                    wizard.revealStep(label);
                } else {

                }
            });
            

            // Añadir el enlace <a> dentro del elemento <li>
            $li.appendChild($a);

            // Añadir el elemento <li> (con su enlace) al contenedor de los breadcrumbs
            $steps.appendChild($li);
        }
    }
}

/**
 * onStepChange - Función que escucha y gestiona el cambio de pasos en el wizard, 
 * actualizando la barra de navegación tipo breadcrumbs.
 * 
 * @param {Object} wizard - Objeto controlador del wizard, encargado de gestionar los pasos.
 * @param {string} selector - ID del elemento HTML donde se mostrará la barra de navegación.
 */
function onStepChange(wizard, selector) {
    
    // Obtener los pasos del wizard utilizando el método getBreadcrumb(), 
    // que devuelve el estado actual de los pasos en formato de objeto.
    const steps = wizard.getBreadcrumb();
    
    // Llamar a la función buildStepsBreadcrumb para construir o actualizar la barra de navegación
    // usando los pasos obtenidos y el selector proporcionado.
    buildStepsBreadcrumb(wizard, selector, steps);
}

/**
 * Inicialización del wizard y configuración de eventos de cambio de paso y envío de formulario.
 * 
 * @param {Object} Zangdar - Biblioteca externa que controla la funcionalidad del wizard.
 * @param {string} '#wizard' - Selector CSS del elemento HTML donde se inicializa el wizard.
 * @param {Object} options - Opciones de configuración del wizard.
 * @param {function} options.onStepChange - Función que se ejecuta cuando hay un cambio de paso en el wizard.
 * @param {function} options.onSubmit - Función que maneja el evento de envío del formulario en el wizard.
 */
const wizard = new window.Zangdar('#wizard', {
    /**
     * Función que se ejecuta cada vez que hay un cambio de paso en el wizard.
     * Llama a la función onStepChange para actualizar la barra de navegación con los pasos.
     */

    onStepChange: () => {
        onStepChange(wizard, 'steps-native'); // Cambia el paso si la validación es exitosa
    },

    /**
     * Función que se ejecuta cuando se envía el formulario en el último paso del wizard.
     * 
     * @param {Event} e - El evento de envío del formulario.
     * @returns {boolean} - Retorna false para prevenir el envío real del formulario.
     */
    onSubmit(e) {
        // Prevenir el comportamiento predeterminado del envío del formulario
        e.preventDefault();

        // Imprimir los elementos del formulario en la consola (útil para depuración)
        console.log(e.target.elements);

        // Retorna false para prevenir que el formulario se envíe
        return false;
    }
});

// Inicializa la barra de navegación de pasos cuando el wizard se carga por primera vez
onStepChange(wizard, 'steps-native');

// Funcion para ingresar la imagen de la foto de perfil
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            console.log("Archivo leído correctamente:", e.target.result); // Debug
            $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
        }
        reader.readAsDataURL(input.files[0]);
    } else {
        console.log("No se seleccionó ningún archivo.");
    }
}

$(document).ready(function () {
    $("#wizard-picture").change(function () {
        console.log("Cambio detectado en el input file"); // Debug
        readURL(this);
    });
});

/*//* ================================ EVENTOS DE ESCUCHA ================================ */

























