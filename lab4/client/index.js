document.addEventListener("DOMContentLoaded", () => {
    const obtenerSalasButton = document.getElementById("obtenerSalas");
    const salasContainer = document.getElementById("salasContainer");
    const edificioSelect = document.getElementById("edificioSelect");
    const horaInput = document.getElementById("horaInput");
    const identificacionInput = document.getElementById("identificacionInput");
    const modificarReservaButton = document.getElementById("modificarReserva");
    let salaSeleccionada = null; // Variable para mantener la sala seleccionada

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

    modificarReservaButton.addEventListener("click", () => {
        const edificioSeleccionado = edificioSelect.value;
        const hora = horaInput.value;
        const identificacion = identificacionInput.value;

        // Verifica si una sala está seleccionada
        if (salaSeleccionada) {
            const salon = salaSeleccionada.getAttribute("data-salon"); // Cambio aquí
            fetch(`http://127.0.0.1:3000/salas/${edificioSeleccionado}/${salon}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    reserva: hora,
                    identificacion: identificacion
                })
            })
            .then((response) => response.json())
            .then((data) => {
                // Maneja la respuesta de la modificación aquí
                // Puedes mostrar un mensaje de éxito o error
            })
            .catch((error) => {
                console.error("Error al modificar la reserva:", error);
            });
        } else {
            console.error("Debes seleccionar una sala antes de modificar la reserva.");
        }
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
                // Agrega un botón o elemento para seleccionar esta sala
                const seleccionarButton = document.createElement("button");
                seleccionarButton.textContent = "Seleccionar";
                seleccionarButton.addEventListener("click", () => {
                    // Marca esta sala como seleccionada
                    seleccionarSala(sala);
                });
                listItem.appendChild(seleccionarButton);
                listaSalas.appendChild(listItem);
            });
            salasContainer.appendChild(listaSalas);
        }
    }

    // Función para marcar una sala como seleccionada
    function seleccionarSala(sala) {
        // Deselecciona todas las salas previamente seleccionadas
        const salasSeleccionadas = document.querySelectorAll(".sala-seleccionada");
        salasSeleccionadas.forEach((s) => {
            s.classList.remove("sala-seleccionada");
        });

        // Marca la sala seleccionada
        const salon = sala.salon;
        salaSeleccionada = document.querySelector(`[data-salon="${salon}"]`);
        if (salaSeleccionada) {
            salaSeleccionada.classList.add("sala-seleccionada");
            salaSeleccionada.parentElement.classList.add("edificio-seleccionado"); // Muestra las salas
        }
    }
});
