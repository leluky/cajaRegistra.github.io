let total = 0;
let ventas = JSON.parse(localStorage.getItem("ventas")) || []; // Recuperar ventas del localStorage si existen

// Si hay ventas guardadas, inicializar el total y actualizar la lista
if (ventas.length > 0) {
    ventas.forEach(venta => {
        total += venta.precio * venta.cantidad;
    });
    actualizarResumen();
}

// Función para agregar producto
function agregarProducto(nombre, precio) {
    const productoExistente = ventas.find(venta => venta.nombre === nombre);
    
    if (productoExistente) {
        // Si el producto ya existe, aumentar la cantidad
        productoExistente.cantidad++;
    } else {
        // Si el producto no existe, agregarlo a la lista de ventas
        ventas.push({ nombre, precio, cantidad: 1 });
    }
    
    total += precio;
    guardarVentas(); // Guardar en localStorage
    actualizarResumen(); // Actualizar el resumen
}

// Función para actualizar el resumen de ventas
function actualizarResumen() {
    const resumen = document.getElementById("resumen");
    resumen.innerHTML = ""; // Limpiar el contenido actual
    
    ventas.forEach((venta, index) => {
        const li = document.createElement("li");
        li.textContent = `${venta.nombre} (x${venta.cantidad}) - $${(venta.precio * venta.cantidad).toFixed(2)}`;
        
        // Botón de "Borrar"
        const borrarBtn = document.createElement("button");
        borrarBtn.textContent = "Borrar";
        borrarBtn.style.marginLeft = "10px";
        borrarBtn.onclick = function () {
            borrarProducto(index);
        };
        
        li.appendChild(borrarBtn);
        resumen.appendChild(li);
    });
    
    document.getElementById("total").textContent = total.toFixed(2);
}

// Función para borrar un producto (restar uno a la cantidad)
function borrarProducto(index) {
    const producto = ventas[index];
    
    // Confirmación antes de restar el producto
    const confirmacion = confirm(`¿Estás seguro de que deseas restar uno de ${producto.nombre}?`);
    
    if (confirmacion) {
        // Si la cantidad es mayor a 1, solo restamos 1
        if (producto.cantidad > 1) {
            producto.cantidad--;
            total -= producto.precio; // Restar el precio al total
        } else {
            // Si solo queda 1 unidad, eliminar el producto de la lista
            total -= producto.precio;
            ventas.splice(index, 1);
        }
        
        guardarVentas(); // Actualizar en localStorage
        actualizarResumen(); // Actualizar la interfaz
    }
}

// Función para finalizar el día con reconfirmación
function finalizarDia() {
    if (ventas.length === 0) {
        alert("No hay ventas para mostrar.");
        return;
    }

    // Mostrar un resumen de las ventas antes de la confirmación
    const resumenDelDia = `Resumen del Día:\n${ventas.map(venta => `${venta.nombre} (x${venta.cantidad}) - $${(venta.precio * venta.cantidad).toFixed(2)}`).join('\n')}\nTotal: $${total.toFixed(2)}`;
    
    // Preguntar si desea finalizar el día
    const confirmacion = confirm(`${resumenDelDia}\n\n¿Estás seguro de que deseas finalizar el día y borrar todas las ventas?`);

    if (confirmacion) {
        // Reiniciar para el próximo día solo si se confirma
        total = 0;
        ventas = [];
        localStorage.removeItem("ventas"); // Limpiar los datos del localStorage
        actualizarResumen();
        alert("El día ha finalizado y todas las ventas han sido borradas.");
    } else {
        alert("El día NO ha sido finalizado. Los datos se mantienen.");
    }
}

// Función para guardar las ventas en localStorage
function guardarVentas() {
    localStorage.setItem("ventas", JSON.stringify(ventas)); // Guardar ventas en formato JSON
}