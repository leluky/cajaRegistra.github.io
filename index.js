let total = 0;
let ventas = [];

// Función para agregar producto a la lista de ventas
function agregarProducto(nombre, precio) {
    total += precio;
    ventas.push({ nombre, precio });
    actualizarResumen();
}

// Función para actualizar el resumen de ventas en la página
function actualizarResumen() {
    const resumen = document.getElementById("resumen");
    resumen.innerHTML = "";

    ventas.forEach((venta, index) => {
        const li = document.createElement("li");
        li.textContent = `${venta.nombre} - $${venta.precio.toFixed(2)}`;

        // Crear botón de "Borrar"
        const borrarBtn = document.createElement("button");
        borrarBtn.textContent = "Borrar";
        borrarBtn.style.marginLeft = "10px";
        borrarBtn.onclick = function () {
            borrarProducto(index); // Llamar a la función de borrado con el índice del producto
        };

        li.appendChild(borrarBtn);
        resumen.appendChild(li);
    });

    // Actualizar el total
    document.getElementById("total").textContent = total.toFixed(2);
}

// Función para borrar un producto de la lista
function borrarProducto(index) {
    // Mostrar mensaje de confirmación antes de borrar
    const confirmacion = confirm("¿Estás seguro de que deseas borrar este producto?");
    if (confirmacion) {
        total -= ventas[index].precio; // Restar el precio del producto del total
        ventas.splice(index, 1); // Eliminar el producto de la lista de ventas
        actualizarResumen(); // Actualizar la interfaz después de borrar
    }
}

// Función para finalizar el día y mostrar un resumen
function finalizarDia() {
    if (ventas.length === 0) {
        alert("No hay ventas para mostrar.");
        return;
    }

    alert(`Resumen del Día:\n${ventas.map(venta => `${venta.nombre} - $${venta.precio.toFixed(2)}`).join('\n')}\nTotal: $${total.toFixed(2)}`);
    
    // Reiniciar para el próximo día
    total = 0;
    ventas = [];
    actualizarResumen();
}