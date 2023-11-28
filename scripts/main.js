$(document).ready(function () {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const carritoItems = $('#carrito-items');
  const carritoTotal = $('#carrito-total');
  const vaciarCarritoBtn = $('#vaciar-carrito');
  const finalizarCompraBtn = $('#finalizar-compra');
  const mensajeEmergente = $('#mensaje-emergente');

  function actualizarCarrito() {
    carritoItems.html('');
    let total = 0;

    carrito.forEach(item => {
      const li = $('<li>').text(`${item.nombre} - ${item.precio} USD`);
      carritoItems.append(li);
      total += item.precio;
    });

    carritoTotal.text(total);
  }

  function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarMensajeEmergente('Producto agregado al carrito: ' + nombre);
  }

  function mostrarMensajeEmergente(mensaje) {
    mensajeEmergente.text(mensaje);
    mensajeEmergente.show();
    setTimeout(function() {
      mensajeEmergente.hide();
    }, 2000);
  }

  function cargarProductos() {
    return $.ajax({
      url: './data/productos.json',
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        console.log('Productos cargados:', data);

        const botonesComprar = $('.boton-comprar');
        botonesComprar.on('click', function () {
          const tarjeta = $(this).closest('.tarjeta');
          const nombre = tarjeta.find('.titulo-tarjeta').text();
          const precio = data.find(producto => producto.nombre === nombre).precio;
          agregarAlCarrito(nombre, precio);
        });
      },
      error: function (error) {
        console.error('No se pudo cargar el archivo de productos.', error);
      }
    });
  }

  finalizarCompraBtn.on('click', function () {
    if (carrito.length > 0) {
      mostrarMensajeEmergente('Compra finalizada. Gracias por tu compra.');
      carrito = [];
      actualizarCarrito();
      localStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
      mostrarMensajeEmergente('El carrito está vacío. Agrega productos antes de finalizar la compra.');
    }
  });

  vaciarCarritoBtn.on('click', function () {
    carrito = [];
    actualizarCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarMensajeEmergente('Carrito vaciado.');
  });

  cargarProductos();

  actualizarCarrito();
});

