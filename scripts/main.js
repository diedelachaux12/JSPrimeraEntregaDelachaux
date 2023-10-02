class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

// Inicializamos un array para el carrito
let carrito = [];

// Función para agregar un producto al carrito
function agregarProducto() {
  while (true) {
    const nombre = prompt("Ingrese el nombre del producto:");

    if (nombre === null) {
      break; // El usuario canceló el prompt, salimos del bucle
    }

    if (nombre.trim() === "") {
      alert("Nombre de producto no válido.");
      continue; // Continuar al siguiente ciclo si el nombre está vacío
    }

    const precio = parseFloat(prompt("Ingrese el precio del producto:"));

    if (isNaN(precio)) {
      alert("Precio no válido.");
      continue; // Continuar al siguiente ciclo si el precio no es válido
    }

    const producto = new Producto(nombre, precio);
    carrito.push(producto);
    alert(`Producto "${nombre}" agregado al carrito.`);

    const respuesta = prompt("¿Desea agregar otro producto al carrito? (Sí/No)");

    if (respuesta === null) {
      break; // El usuario canceló el prompt, salimos del bucle
    }

    if (respuesta.toLowerCase() === "no") {
      mostrarTotalCarrito(); // Mostrar el total cuando el usuario responde "NO"
      break; // Salimos del bucle
    }
  }
}

// Función para calcular el total de la compra
function calcularTotal() {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].precio;
  }
  return total;
}

// Función para mostrar el carrito
function mostrarCarrito() {
  if (carrito.length > 0) {
    console.log("Carrito de compras:");
    for (let i = 0; i < carrito.length; i++) {
      console.log(`Producto: ${carrito[i].nombre}, Precio: $${carrito[i].precio.toFixed(2)}`);
    }
  } else {
    console.log("El carrito está vacío.");
  }
}

// Función para mostrar el total del carrito en un alert
function mostrarTotalCarrito() {
  const totalCompra = calcularTotal();
  alert(`El total del valor a pagar es: $${totalCompra.toFixed(2)}`);
}

// Inicia el proceso
agregarProducto(); // Esto permite al usuario agregar productos al carrito.


// Función para mostrar el carrito y el total al final
mostrarCarrito();
