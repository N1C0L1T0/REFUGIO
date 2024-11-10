<?php
session_start();
session_unset(); // Limpiar todas las variables de sesión
session_destroy(); // Destruir la sesión
header("Location: ../index.html"); // Redirigir al inicio
exit();
?>
