const panelReservas = document.querySelector(".panel-reservas");
const spaces = document.querySelectorAll(".space:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const vehiculSelect = document.getElementById("tVehicul");

populateUI();

let ticketPrice = +vehiculSelect.value;

// Save selected movie index and price
function setVehiculData(vehiculIndex, vehiculPrice) {
  localStorage.setItem("selectedvehiculIndex", vehiculIndex);
  localStorage.setItem("selectedvehiculPrice", vehiculPrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSpaces = document.querySelectorAll(".space.selected");

  const spacesIndex = [...selectedSpaces].map((space) => [...spaces].indexOf(space));

  localStorage.setItem("selectedSpaces", JSON.stringify(spacesIndex));

  const selectedSpacesCount = selectedSpaces.length;

  count.innerText = selectedSpacesCount;
  total.innerText = selectedSpacesCount * ticketPrice;

  setVehiculData(vehiculSelect.selectedIndex, vehiculSelect.value);
}


// Get data from localstorage and populate UI
function populateUI() {
  const selectedSpaces = JSON.parse(localStorage.getItem("selectedSpaces"));

  if (selectedSpaces !== null && selectedSpaces.length > 0) {
    spaces.forEach((space, index) => {
      if (selectedSpaces.indexOf(index) > -1) {
        console.log(space.classList.add("selected"));
      }
    });
  }

  const selectedvehiculIndex = localStorage.getItem("selectedvehiculIndex");

  if (selectedvehiculIndex !== null) {
    vehiculSelect.selectedIndex = selectedvehiculIndex;
    console.log(selectedvehiculIndex)
  }
}
console.log(populateUI())

// vehicul select event
vehiculSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setVehiculData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// space click event
panelReservas.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("space") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();

// Botón de confirmar selección
const confirmBtn = document.getElementById("confirmButton");

confirmBtn.addEventListener("click", () => {
  // Redirigir a la página de pago
  window.location.href = "pago.html";
});
