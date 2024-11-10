// Recuperar los datos del localStorage
const selectedSpaces = JSON.parse(localStorage.getItem("selectedSpaces"));
const storedTicketPrice = localStorage.getItem("selectedvehiculPrice");

if (selectedSpaces && storedTicketPrice) {
    const cantidad = selectedSpaces.length;
    const total = cantidad * storedTicketPrice;

    // Mostrar la cantidad y el total
    document.getElementById("cantidad").innerText = `: ${cantidad}`;
    document.getElementById("totalPago").innerText = `$${total}`;
} else {
    // Si no hay datos, mostrar un mensaje
    document.getElementById("cantidad").innerText = "No hay sillas seleccionadas.";
}