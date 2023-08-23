  // Productos disponibles cargados desde el productos.json
  let productos = [];

  fetch("./script/productos.json")
  .then(response => response.json())
  .then(data => {
    productos = data;
    cargarProductos(productos);
  })

  // Obtener elementos del DOM
  const contenedorProductos = document.querySelector("#contenedor-productos");
  const botonesCategorias = document.querySelectorAll(".boton-categoria");
  const enviarBoton = document.getElementById("enviarBoton");
  const inicio = document.querySelector(".inicio");
  const contenidoPrincipal = document.getElementById("contenidoPrincipal");
  const nombreUsuarioSpan = document.getElementById("nombreUsuario");
  const nombreInput = document.getElementById("nombreInput");
  const listaCarrito = document.getElementById("lista-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  const botonLimpiarCarrito = document.getElementById("boton-limpiar");
  const botonComprar = document.getElementById("boton-comprar");
  const botonDesplegarCarrito = document.getElementById("boton-desplegar-carrito");
  const carritoElemento = document.getElementById("carrito");

  // Función para cargar los productos en el contenedor del HTML
  function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
        <img class="producto-imagen img-fluid" src="${producto.imagen}" alt="${producto.imagen}">
        <div class="producto-detalles">
            <h2 class="producto-titulo">${producto.titulo}</h2>
            <p class="producto-detalles">${producto.detalles}</p>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="boton-agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
        </div>
      `;
      contenedorProductos.append(div);
    });
  }

  // Cargar los productos iniciales
  

  // Función para filtrar productos por categoría
  function filtrarProductos(productos, filtro) {
    return productos.filter(filtro);
  }

  // Event listener para los botones de categoría
  botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
      // Remover la clase "active" de todos los botones de categoría
      botonesCategorias.forEach(boton => boton.classList.remove("active"));
      // Agregar la clase "active" al botón de categoría seleccionado
      e.currentTarget.classList.add("active");

      // Función de filtro basada en el id de la categoría seleccionada
      function filtroCategoria(producto) {
        return e.currentTarget.id === "todos" || producto.categoria.id == e.currentTarget.id;
      }

      // Filtrar productos y cargarlos
      const productosFiltrados = filtrarProductos(productos, filtroCategoria);
      cargarProductos(productosFiltrados);
    });
  });

  // Event listener para el botón "Enviar" del formulario de nombre de usuario
  enviarBoton.addEventListener("click", function () {
    mostrarSaludo();
  });

  // Verificar si hay un nombre de usuario guardado en el localStorage
  const nombreUsuarioGuardado = localStorage.getItem("nombreUsuario");

  // Mostrar contenido principal si ya hay un nombre de usuario guardado
  if (nombreUsuarioGuardado) {
    mostrarContenidoPrincipal(nombreUsuarioGuardado);
  } else {
    mostrarFormularioNombreUsuario();
  }

  // Función para mostrar el contenido principal y guardar el nombre de usuario en el localStorage
  function mostrarSaludo() {
    const nombreUsuario = nombreInput.value.trim();

    if (nombreUsuario !== "") {
      // Guardar el nombre de usuario en el localStorage
      localStorage.setItem("nombreUsuario", nombreUsuario);

      // Mostrar el contenido principal y ocultar el formulario
      mostrarContenidoPrincipal(nombreUsuario);
    }
  }

  // Función para mostrar el contenido principal y ocultar el formulario de nombre de usuario
  function mostrarContenidoPrincipal(nombreUsuario) {
    inicio.style.display = "none";
    contenidoPrincipal.style.display = "flex";
    contenidoPrincipal.style.flexDirection = "column";
    nombreUsuarioSpan.textContent = nombreUsuario;
  }

  // Función para mostrar el formulario de nombre de usuario y ocultar el contenido principal
  function mostrarFormularioNombreUsuario() {
    inicio.style.display = "flex";
    inicio.style.flexDirection = "column";
    contenidoPrincipal.style.display = "none";
  }

  // Carrito de compra (inicialmente vacío)
  let carrito = [];

  // Función para agregar un producto al carrito
  function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
  }

  // Función para actualizar la visualización del carrito
  function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
      const itemCarrito = document.createElement("li");
      itemCarrito.textContent = `${producto.titulo} - $${producto.precio}`;
      listaCarrito.appendChild(itemCarrito);

      total += producto.precio;
    });

    totalCarrito.textContent = `Total: $${total}`;
  }

  // Función para cargar el carrito desde el localStorage
  function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
      actualizarCarrito();
    }
  }

  // Función para guardar el carrito en el localStorage
  function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // Cargar el carrito desde el localStorage
  cargarCarritoDesdeLocalStorage();

  // Event listener para los botones de "Agregar al carrito"
  const botonesAgregarCarrito = document.querySelectorAll(".boton-agregar-carrito");
  botonesAgregarCarrito.forEach(boton => {
  boton.addEventListener("click", (e) => {
    const productoId = e.currentTarget.dataset.id;
    const productoSeleccionado = productos.find(producto => producto.id === productoId);
    if (productoSeleccionado) {
      agregarAlCarrito(productoSeleccionado);
    }
  });
});
// Event listener para el contenedor de productos utilizando event delegation
contenedorProductos.addEventListener("click", function (event) {
  const botonAgregar = event.target.closest(".boton-agregar-carrito");
  if (botonAgregar) {
    const productoId = botonAgregar.dataset.id;
    const productoSeleccionado = productos.find(producto => producto.id === productoId);
    if (productoSeleccionado) {
      agregarAlCarrito(productoSeleccionado);
    }
  }
});


// Event listener para el botón "Limpiar carrito"
botonLimpiarCarrito.addEventListener("click", function () {
  // Usar SweetAlert2 para mostrar una confirmación antes de limpiar el carrito
  Swal.fire({
    title: "¿Estás seguro?",
    html: '<span style="color: white;">Esta acción eliminará todos los productos del carrito</span>',
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, limpiar carrito",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  }).then((result) => {
    if (result.isConfirmed) {
      // Si el usuario confirma, proceder a limpiar el carrito
      carrito = [];
      actualizarCarrito();
      guardarCarritoEnLocalStorage();

      Swal.fire({
        title: "Carrito limpiado",
        html: '<span style="color: white;">El carrito ha sido limpiado exitosamente</span>',
        icon: "success",
       
      });
    }
  });
});
  

  // Event listener para el botón "Comprar"
    botonComprar.addEventListener("click", function () {
    const precioTotal = calcularPrecioTotal();
    const rutaActual = new URL(window.location.href);
    const rutaPaginaPagar = new URL("pages/pagar.html", rutaActual);
    rutaPaginaPagar.searchParams.set("total", precioTotal);
    window.location.href = rutaPaginaPagar.href;
  });

  // Event listener para el botón "Desplegar carrito"
  botonDesplegarCarrito.addEventListener("click", function () {
    carritoElemento.classList.toggle("carrito-navbar-abierto");
  });

  // Función para calcular el precio total del carrito
  function calcularPrecioTotal() {
    let total = 0;

    carrito.forEach(producto => {
      total += producto.precio;
    });

    return total;
  }
  
  

  