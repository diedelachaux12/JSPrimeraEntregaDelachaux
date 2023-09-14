// variables para el carrito y el total
let carrito = [];
let total = 0;

// Ciclo para agregar productos al carrito
while (true) {
  const respuesta = prompt("¿Desea agregar un producto al carrito? (Sí/No)");

  if (respuesta === null) {
    break; // El usuario canceló el prompt, salimos del bucle
  }

  if (respuesta.toUpperCase() === "SI") {
    agregarAlCarrito();
  } else if (respuesta.toUpperCase() === "NO") {
    break;
  } else {
    alert("Respuesta no válida. Por favor, ingrese 'Sí' o 'No'.");
  }
}

// Función para agregar un producto al carrito
function agregarAlCarrito() {
  const producto = prompt("Ingrese el nombre del producto:");

  if (producto !== null && producto.trim() !== "") {
    const precio = parseFloat(prompt("Ingrese el precio del producto:"));

    if (!isNaN(precio)) {
      carrito.push({ producto, precio });
      alert(`Producto "${producto}" agregado al carrito.`);
    } else {
      alert("Precio no válido. El producto no se agregó al carrito.");
    }
  } 
}

// Calcular el total de la compra
for (let i = 0; i < carrito.length; i++) {
  total += carrito[i].precio;
}

// Mostrar el total de la compra
if (carrito.length > 0) {
  alert(`El total del valor a pagar es: $${total}`);
} else {
  alert("El carrito está vacío. No se realizará ninguna compra.");
}

