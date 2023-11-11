$(document).ready(function () {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    const carritoItems = $('#carrito-items');
    const carritoTotal = $('#carrito-total');
    const vaciarCarritoBtn = $('#vaciar-carrito');
  
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
            const precio = 100; // Reemplaza esto con la lógica para obtener el precio del producto desde los datos cargados
            agregarAlCarrito(nombre, precio);
            console.log('Producto agregado al carrito:', nombre);
          });
        },
        error: function (error) {
          console.error('No se pudo cargar el archivo de productos.', error);
        }
      });
    }
  
    cargarProductos(); // Llama a la función para cargar productos al cargar la página
  
    vaciarCarritoBtn.on('click', function () {
      carrito = [];
      actualizarCarrito();
      localStorage.setItem('carrito', JSON.stringify(carrito));
      console.log('Carrito vaciado.');
    });
  
    actualizarCarrito();
  });
  
