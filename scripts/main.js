document.addEventListener("DOMContentLoaded", function () {
  // Obtenemos referencias a elementos HTML
  const carritoItems = document.getElementById("carrito-items");
  const carritoTotal = document.getElementById("carrito-total");
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

  // Inicializamos el carrito
  let carrito = [];

  // Objeto con precios de los productos
  const preciosProductos = {
    "Jordan 1 Low": 100,
    "Air Force 1 '07 Premium": 120,
    "Air Jordan 1 Mid SE": 110,
    "Dunk Low Retro 'Panda'": 90

  };

  // Función para actualizar la vista del carrito
  function actualizarCarrito() {
    // Limpiamos la vista del carrito
    carritoItems.innerHTML = "";

    // Calculamos el total
    let total = 0;

    carrito.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.nombre} - ${item.precio} USD`;

      const eliminarBtn = document.createElement("button");
      eliminarBtn.textContent = "Eliminar";
      eliminarBtn.classList.add("boton-eliminar");
      eliminarBtn.addEventListener("click", () => {
        eliminarItemDelCarrito(item);
      });

      eliminarBtn.style.backgroundColor = "#c62d1f";
      eliminarBtn.style.color = "white";
      eliminarBtn.style.border = "none";
      eliminarBtn.style.padding = "5px 10px";
      eliminarBtn.style.borderRadius = "4px";
      eliminarBtn.style.cursor = "pointer";
      eliminarBtn.style.fontSize = "14px";

      li.appendChild(eliminarBtn);
      carritoItems.appendChild(li);

      total += item.precio;
    });

    carritoTotal.textContent = total;
  }

  // Función para agregar un item al carrito
  function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
  }

  // Función para eliminar un item del carrito
  function eliminarItemDelCarrito(item) {
    const index = carrito.indexOf(item);
    if (index !== -1) {
      carrito.splice(index, 1);
      actualizarCarrito();
    }
  }

  // Manejadores de eventos para los botones "Comprar"
  const botonesComprar = document.querySelectorAll(".boton-comprar");
  botonesComprar.forEach(boton => {
    boton.addEventListener("click", () => {
      const tarjeta = boton.closest(".tarjeta");
      const nombre = tarjeta.querySelector(".titulo-tarjeta").textContent;
      const precio = preciosProductos[nombre]; // Obtener el precio del objeto
      agregarAlCarrito(nombre, precio);
    });
  });

  // Manejador de evento para el botón "Vaciar Carrito"
  vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
  });
});

