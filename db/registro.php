<?php 

// Incluyo la conexión a la base de datos
include("con_db.php");

// Obtener valores del formulario a variables PHP
$email = $_POST['CORREO'];
$password = $_POST['CONTRASEÑA'];
$nombre = $_POST['NOMBRE'];
$apellido = $_POST['APELLIDO'];
$telefono = $_POST['TELEFONO'];
$tipoVehiculo = $_POST['TIPOVEHICULO'];
$modelo = $_POST['MODELO'];
$placa = $_POST['PLACA'];

// Hashear la contraseña
$contraseñaHashMd5 = md5($password);

// Verificar si el correo ya existe
$sqlCheckEmail = "SELECT * FROM `clientes` WHERE `Correo` = ?";
$stmt = mysqli_prepare($conexion, $sqlCheckEmail);
mysqli_stmt_bind_param($stmt, 's', $email);
mysqli_stmt_execute($stmt);
$resultEmail = mysqli_stmt_get_result($stmt);

// Verificar si el teléfono ya existe
$sqlCheckTelefono = "SELECT * FROM `clientes` WHERE `Telefono` = ?";
$stmt2 = mysqli_prepare($conexion, $sqlCheckTelefono);
mysqli_stmt_bind_param($stmt2, 's', $telefono);
mysqli_stmt_execute($stmt2);
$resultTelefono = mysqli_stmt_get_result($stmt2);

// Verificar si la placa ya existe
$sqlCheckPlaca = "SELECT * FROM `carros` WHERE `Id_Placa` = ?";
$stmt3 = mysqli_prepare($conexion, $sqlCheckPlaca);
mysqli_stmt_bind_param($stmt3, 's', $placa);
mysqli_stmt_execute($stmt3);
$resultPlaca = mysqli_stmt_get_result($stmt3);

// Comprobar resultados
if (mysqli_num_rows($resultEmail) > 0) {
    echo json_encode(array('rta' => 'ERROR', 'message' => 'El correo ya está registrado.'));
    exit();
} elseif (mysqli_num_rows($resultTelefono) > 0) {
    echo json_encode(array('rta' => 'ERROR', 'message' => 'El teléfono ya está registrado.'));
    exit();
} elseif (mysqli_num_rows($resultPlaca) > 0) {
    echo json_encode(array('rta' => 'ERROR', 'message' => 'La placa ya está registrada.'));
    exit();
} else {
    // Si todo está bien, procede con la inserción
    // Insertar en la tabla clientes
    $sql1 = "INSERT INTO `clientes`(`Nombre`, `Apellido`, `Telefono`, `Correo`, `Contraseña`) 
    VALUES (?, ?, ?, ?, ?)";

    // Preparar la consulta para insertar en la tabla clientes
    $qry1 = mysqli_prepare($conexion, $sql1);

    // Vincular los parámetros
    mysqli_stmt_bind_param($qry1, 'sssss', $nombre, $apellido, $telefono, $email, $contraseñaHashMd5);

    // Ejecutar la consulta
    if (mysqli_stmt_execute($qry1)) {
        // Obtener el ID del cliente recién insertado
        $id_cliente = mysqli_insert_id($conexion);

        // Insertar en la tabla carros
        $sql2 = "INSERT INTO `carros`(`Id_Placa`, `Id_tipoVehiculo`, `Modelo`, `Id_Cliente`) 
        VALUES (?, ?, ?, ?)";

        // Preparar la consulta para insertar en la tabla carros
        $qry2 = mysqli_prepare($conexion, $sql2);

        // Vincular los parámetros
        mysqli_stmt_bind_param($qry2, 'sssi', $placa, $tipoVehiculo, $modelo, $id_cliente);

        // Ejecutar la consulta
        if (mysqli_stmt_execute($qry2)) {
            // Respuesta JSON de éxito
            $response = array('rta' => 'OK', 'message' => 'Datos insertados correctamente');
        } else {
            // Respuesta JSON de error en la inserción de carros
            $response = array('rta' => 'ERROR', 'message' => 'Error al insertar en la tabla carros: ' . mysqli_error($conexion));
        }

    } else {
        // Respuesta JSON de error en la inserción de clientes
        $response = array('rta' => 'ERROR', 'message' => 'Error al insertar en la tabla clientes: ' . mysqli_error($conexion));
    }

    // Establecer el tipo de contenido
    header('Content-Type: application/json');

    // Enviar la respuesta JSON
    echo json_encode($response);
}

// Cerrar la conexión
mysqli_close($conexion);

?>
