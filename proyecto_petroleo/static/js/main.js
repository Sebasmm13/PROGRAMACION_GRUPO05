// ============================================================
// main.js — Lógica del lado del cliente (navegador)
// ============================================================

// ─── ESPERAR A QUE EL HTML ESTÉ LISTO ───────────────────────
document.addEventListener("DOMContentLoaded", function () {

  // ─── PREVISUALIZACIÓN DE IMAGEN AL CARGAR ─────────────────
  // Busca el input de tipo archivo (si existe en la página)
  const inputImagen = document.getElementById("inputImagen");
  const previsualizacion = document.getElementById("previsualizacion");

  if (inputImagen) {
    inputImagen.addEventListener("change", function () {
      const archivo = this.files[0];  // Primer archivo seleccionado

      if (archivo) {
        const lector = new FileReader();  // Lee el archivo localmente

        // Cuando termina de leer, muestra la imagen
        lector.onload = function (e) {
          previsualizacion.innerHTML = `
            <img src="${e.target.result}" 
                 alt="Imagen cargada" 
                 style="max-width:100%; border-radius:10px; margin-top:15px;">
          `;
        };

        lector.readAsDataURL(archivo);  // Lee como URL base64
      }
    });
  }


  // ─── SIMULAR ANÁLISIS (botón "Analizar") ──────────────────
  // Muestra una barra de progreso animada al presionar el botón
  const btnAnalizar = document.getElementById("btnAnalizar");

  if (btnAnalizar) {
    btnAnalizar.addEventListener("click", function () {
      // Mostramos la sección de resultados
      document.getElementById("seccionResultado").style.display = "block";

      // Barra de progreso que va del 0% al 100% en 1.5 segundos
      const barra = document.getElementById("barraProgreso");
      barra.style.width = "0%";

      setTimeout(() => { barra.style.width = "100%"; }, 100);

      // Después de 2 segundos mostramos el resultado simulado
      setTimeout(() => {
        document.getElementById("textoResultado").innerHTML = `
          <strong style="color:#ff6b6b;">⚠️ DERRAME DETECTADO</strong><br>
          <small style="color:#aaa;">
            Área estimada: <strong>2.4 km²</strong> &nbsp;|&nbsp;
            Confianza: <strong>87%</strong> &nbsp;|&nbsp;
            Severidad: <strong style="color:#f0a500;">Media</strong>
          </small>
        `;
      }, 2000);
    });
  }


  // ─── FILTRO EN LA TABLA DE HISTORIAL ─────────────────────
  // Permite buscar registros escribiendo en el buscador
  const inputBuscar = document.getElementById("inputBuscar");

  if (inputBuscar) {
    inputBuscar.addEventListener("keyup", function () {
      const texto = this.value.toLowerCase();  // Texto en minúsculas
      const filas = document.querySelectorAll(".fila-historial");

      filas.forEach(fila => {
        // Muestra la fila solo si contiene el texto buscado
        fila.style.display = fila.textContent.toLowerCase().includes(texto) ? "" : "none";
      });
    });
  }


  // ─── ANIMACIÓN DE CONTADORES (página Inicio) ──────────────
  // Hace que los números suban gradualmente al cargar
  const contadores = document.querySelectorAll(".contador-animado");

  contadores.forEach(contador => {
    const meta = parseInt(contador.getAttribute("data-meta"));  // Valor final
    let actual  = 0;
    const paso  = Math.ceil(meta / 40);  // Incremento por frame

    const intervalo = setInterval(() => {
      actual += paso;
      if (actual >= meta) {
        actual = meta;
        clearInterval(intervalo);  // Detenemos cuando llegamos al tope
      }
      contador.textContent = actual;
    }, 40);  // Cada 40ms (~25 fps)
  });

});
