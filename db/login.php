<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
header('Content-Type: application/json');  // Asegúrate de que la respuesta sea JSON

// Incluyo la conexión a la base de datos
include("con_db.php");

// Verificar la conexión
if ($conexion->connect_error) {
    echo json_encode(['rta' => 'ERROR', 'message' => 'Error en la conexión a la base de datos']);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['CORREO']);
    $password = trim($_POST['CONTRASEÑA']);

    if (empty($email) || empty($password)) {
        echo json_encode(['rta' => 'ERROR', 'message' => 'Correo o contraseña no pueden estar vacíos']);
        exit();
    }

    // Buscar al usuario en la base de datos por correo
    $sql = "SELECT * FROM clientes WHERE Correo = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verificar si la contraseña es correcta
        if (password_verify($password, $user['Contraseña'])) {
            $_SESSION['user_id'] = $user['Id_Cliente'];
            $_SESSION['user_email'] = $user['Correo'];
            echo json_encode(['rta' => 'OK', 'message' => 'Inicio de sesión exitoso']);
        } else {
            echo json_encode(['rta' => 'ERROR', 'message' => 'Contraseña incorrecta']);
        }
    } else {
        echo json_encode(['rta' => 'ERROR', 'message' => 'No existe una cuenta con ese correo']);
    }
}

$conexion->close();
?>