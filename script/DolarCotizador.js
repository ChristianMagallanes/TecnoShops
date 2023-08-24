// Fetch para el Dólar Oficial mediante una api
fetch("https://dolarapi.com/v1/dolares/oficial")
  .then(response => response.json())
  .then(data => {
    const compraOficialSpan = document.getElementById("compra-oficial");
    const ventaOficialSpan = document.getElementById("venta-oficial");

    compraOficialSpan.textContent = data.compra;
    ventaOficialSpan.textContent = data.venta;
  })
  .catch(error => {
    console.error("Ocurrió un error al obtener los datos del Dólar Oficial:", error);
  });

// Fetch para el Dólar Blue
fetch("https://dolarapi.com/v1/dolares/blue")
  .then(response => response.json())
  .then(data => {
    const compraBlueSpan = document.getElementById("compra-blue");
    const ventaBlueSpan = document.getElementById("venta-blue");

    compraBlueSpan.textContent = data.compra;
    ventaBlueSpan.textContent = data.venta;
  })
  .catch(error => {
    console.error("Ocurrió un error al obtener los datos del Dólar Blue:", error);
  });
