document.addEventListener("DOMContentLoaded", () => {
    const obtenerSalasButton = document.getElementById("obtenerSalas");
    const salasContainer = document.getElementById("salasContainer");
    const edificioSelect = document.getElementById("edificioSelect");

    obtenerSalasButton.addEventListener("click", () => {
        const edificioSeleccionado = edificioSelect.value;
        fetch(`http://127.0.0.1:3000/salas/${edificioSeleccionado}`)
            .then((response) => response.json())
            .then((data) => {
                // Maneja la respuesta aquí
                mostrarSalas(data);
            })
            .catch((error) => {
                console.error("Error al obtener las salas:", error);
            });
    });

    function mostrarSalas(salas) {
        // Limpia el contenedor antes de mostrar las nuevas salas.
        salasContainer.innerHTML = "";

        if (salas.length === 0) {
            salasContainer.innerHTML = "No se encontraron salas en este edificio.";
        } else {
            const listaSalas = document.createElement("ul");
            salas.forEach((sala) => {
                const listItem = document.createElement("li");
                listItem.textContent = `Salón ${sala.salon}, Reserva: ${sala.reserva}`;
                listaSalas.appendChild(listItem);
            });
            salasContainer.appendChild(listaSalas);
        }
    }
});
