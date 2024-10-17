<?php
session_start();
include("con_db.php"); // Conectar a la base de datos

// Verificar si el usuario está autenticado
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['rta' => 'ERROR', 'message' => 'Usuario no autenticado']);
    exit();
}

// Obtener el ID del usuario de la sesión
$user_id = $_SESSION['user_id'];

// Consulta para obtener los datos del usuario
$sql = "SELECT c.Nombre, c.Apellido, ca.Modelo, ca.Id_Placa 
        FROM clientes c 
        JOIN carros ca ON c.Id_Cliente = ca.Id_Cliente 
        WHERE c.Id_Cliente = ?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user_data = $result->fetch_assoc();
    echo json_encode(['rta' => 'OK', 'data' => $user_data]);
} else {
    echo json_encode(['rta' => 'ERROR', 'message' => 'No se encontraron datos']);
}

$stmt->close();
$conexion->close();
?>
