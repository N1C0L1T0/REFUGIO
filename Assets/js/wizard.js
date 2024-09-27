
function validarCampo(pasoActual) {
    

    if (pasoActual === '1. Cuenta') {
        let errores = []; // array para almacenar los errores
        let valCorreo = document.getElementById("correo");
        let correoValue = valCorreo.value.trim();

        // Validar email
        let valEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!valEmail.test(correoValue)) {
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
        let password = document.getElementById("contra"); // Asegúrate que el ID sea correcto
        let passwordVal = password.value.trim(); // Añadido trim() para eliminar espacios

        if (passwordVal.length < 6 || passwordVal === "") {
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
            return false
        }


    } 
    
    if (pasoActual === '2. Perfil') {
        let errores = []; // array para almacenar los errores
        //Validar nombre
        let nombre1 = document.getElementById("nombre")
        let nombreVal = nombre1.value.trim();
        const uu = /^[a-zA-Z ]*$/;

        if (!nombreVal.match(uu) || nombreVal === "") {
            let mensajeError = document.getElementById("error-nom");
            mensajeError.innerHTML = "Por favor, Ingrese un nombre valido";
            mensajeError.style.color = "red";
            errores.push("error-nom"); // La contraseña no es válida
        } else {
            // Limpiar mensaje de error si la contraseña es válida
            let mensajeError = document.getElementById("error-nom");
            mensajeError.innerHTML = "";
        }
    

        //Validad apellido
        let apelllido1 = document.getElementById("apellido")
        let apellidoVal = apelllido1.value.trim()
        let valApellido = /^[a-zA-ZÀ-ÿ]+$/; // Expresión regular para una sola palabra con letras

        if (!valApellido.test(apellidoVal) || apellidoVal === "") {
            let mensajeError = document.getElementById("error-ape");
            mensajeError.innerHTML = "Por favor, Ingrese un apellido valido";
            mensajeError.style.color = "red";
            errores.push("error-ape"); // Agrega el error a la lista
        } else {
            // Limpiar mensaje de error si el apellido es válido
            let mensajeError = document.getElementById("error-ape");
            mensajeError.innerHTML = "";
        }

        // Valida numero de telefono 
        let numero1 = document.getElementById("telefono")
        let numeroVal = numero1.value.trim()

        if (numeroVal === "" || numeroVal.length !== 10) {
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
            return false
        }
    
    }

    if (pasoActual === '3. Vehiculo') {
        let errores = [];

        // Valida modelo 
        let modelo1 = document.getElementById("modelo")
        let modeloVal = modelo1.value.trim()

        if (modeloVal === "") {
            let mensajeError = document.getElementById("error-model");
            mensajeError.innerHTML = "Por favor, Ingrese un modelo valido";
            mensajeError.style.color = "red";
            errores.push("error-model"); // Agrega el error a la lista
        } else {
            // Limpiar mensaje de error si el modelo es válido
            let mensajeError = document.getElementById("error-model");
            mensajeError.innerHTML = "";
        }


        // valida placa
        let placa1 = document.getElementById("placa");
        let placaVal = placa1.value.trim(); // Eliminar espacios al inicio y final

        // Expresión regular para validar
        let regex = /^[A-Za-z]{3}[A-Za-z0-9]{3}$/;

        if (!regex.test(placaVal) || placaVal.length !== 6) {
            let mensajeError = document.getElementById("error-placa");
            mensajeError.innerHTML = "La placa debe tener exactamente 6 caracteres, los primeros 3 letras y los últimos 3 pueden ser letras o números.";
            mensajeError.style.color = "red";
            errores.push("error-placa"); // Agrega el error a la lista
        } else {
            // Limpiar mensaje de error si es válida
            let mensajeError = document.getElementById("error-placa");
            mensajeError.innerHTML = "";
        }

        // Retornar true solo si hay cero errores
        if (errores.length === 0) {
            return true
        } else {
            return false
        }

    }
}


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

// funcion para cuando de click en el paso tercero
$("#submit-button").click(function (e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del botón

    const pasoActual = wizard.getCurrentStep().label;
    console.log(pasoActual);
    const isValid = validarCampo(pasoActual); // Validar el formulario
    
    if (isValid) {
        // Si la validación es exitosa, enviar el formulario o realizar otra acción
        console.log("BIEN")
        document.getElementById("miFormulario").submit(); // Para enviar el formulario
        
        // o puedes hacer otra acción, como mostrar un mensaje de éxito.
    } else {
        // Manejo de errores, ya se hace en la función de validación
        console.log("Errores en la validación del paso 3.");
    }
});



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

























