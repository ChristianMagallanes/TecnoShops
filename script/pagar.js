  // Función para crear el formulario de tarjeta de crédito y el resumen de compra
  function crearFormularioYResumen() {
    const pagarContainer = document.querySelector(".PagarContainer");

    // Crear el contenedor para el formulario de tarjeta de crédito
    const formularioTarjeta = document.createElement("div");
    formularioTarjeta.classList.add("container");

    formularioTarjeta.innerHTML = `
      <h1>Rellena los campos para finalizar tu compra</h1>
      <form id="creditCardForm">
        <label for="cardNumber">Número de Tarjeta de Crédito:</label>
        <input type="text" id="cardNumber" maxlength="16" placeholder="1234 5678 9012 3456" required>

        <label for="cardHolder">Titular de la Tarjeta:</label>
        <input type="text" id="cardHolder" required>

        <label for="expirationDate">Fecha de Expiración:</label>
        <input type="text" id="expirationDate" placeholder="MM/AA" maxlength="5" required>

        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" maxlength="3" required>

        <!-- Nuevos campos para dirección y número de teléfono -->
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" required>

        <label for="numeroTelefono">Número de Teléfono:</label>
        <input type="tel" id="numeroTelefono" required>

        <button type="submit">Comprar</button>
      </form>
    `;

    // Crear el contenedor para el resumen de compra
    const resumenCompra = document.createElement("div");
    resumenCompra.id = "resumen-compra";

    resumenCompra.innerHTML = `
      <h2>Resumen de la compra</h2>
      <ul id="lista-productos"></ul>
      <p id="total-pagar"></p>
    `;

    // Agregar ambos contenedores al div con clase "PagarContainer"
    pagarContainer.appendChild(formularioTarjeta);
    pagarContainer.appendChild(resumenCompra);
  }

  // Llamar a la función para crear el formulario de tarjeta de crédito y el resumen de compra
  crearFormularioYResumen();

  

  // Función para mostrar el mensaje de pago realizado con éxito
  function mostrarMensajeExito() {
    const mensajeExito = document.getElementById("mensajeExito");
    mensajeExito.style.display = "block";
  // Ocultar el mensaje después de 3 segundos (3000 milisegundos)  
    setTimeout(() => {
      mensajeExito.style.display = "none";
    }, 3000); 
  }

  // Obtener el formulario de tarjeta de crédito, el mensaje de éxito y el botón de cerrar
  const creditCardForm = document.getElementById("creditCardForm");
  const mensajeExito = document.getElementById("mensajeExito");

  // Event listener para procesar la compra y mostrar el mensaje de éxito
  creditCardForm.addEventListener("submit", function (event) {
    event.preventDefault();

    //
    // Queda pendiente realizar la logica para procesar la compra :)
    //

    // Mostrar el mensaje de éxito
    mostrarMensajeExito();

    // Limpiar formulario al enviar los datos
    creditCardForm.reset();
  });

  // Obtener el parámetro "total" de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const precioTotal = urlParams.get('total');

  // Obtener el carrito desde el localStorage
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    const carrito = JSON.parse(carritoGuardado);

    // Obtener el elemento donde se mostrará el contenido
    const listaProductos = document.getElementById("lista-productos");
    const totalPagar = document.getElementById("total-pagar");

    // Mostrar los productos en el resumen de compra y calcular el total a pagar
    let total = 0;
    carrito.forEach(producto => {
      const itemProducto = document.createElement("li");
      itemProducto.textContent = `${producto.titulo} - $${producto.precio}`;
      listaProductos.appendChild(itemProducto);

      total += producto.precio;
    });

    // Mostrar el total a pagar
    totalPagar.textContent = `Total a pagar: $${total}`;
  }