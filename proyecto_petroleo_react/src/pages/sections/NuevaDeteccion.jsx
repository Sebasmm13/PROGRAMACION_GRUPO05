// ============================================================
// NuevaDeteccion.jsx — Sección 2: Carga y análisis de imágenes
// ============================================================
import { useState, useRef } from 'react'

export default function NuevaDeteccion() {
  // Estados de React para controlar la UI
  const [preview,    setPreview]    = useState(null)    // URL de la imagen cargada
  const [analizando, setAnalizando] = useState(false)   // Si está procesando
  const [resultado,  setResultado]  = useState(null)    // Resultado del análisis
  const [progreso,   setProgreso]   = useState(0)       // Ancho de la barra (0-100)

  const inputRef = useRef()  // Referencia al input de archivo (oculto)

  // Se ejecuta al seleccionar una imagen
  function handleArchivo(e) {
    const archivo = e.target.files[0]
    if (!archivo) return

    // FileReader: lee el archivo localmente y lo convierte a URL base64
    const lector = new FileReader()
    lector.onload = ev => setPreview(ev.target.result)
    lector.readAsDataURL(archivo)

    // Reiniciamos resultado anterior
    setResultado(null)
    setProgreso(0)
  }

  // Simula el proceso de análisis con IA
  function handleAnalizar() {
    if (!preview) { alert('⚠️ Primero carga una imagen.'); return }

    setAnalizando(true)
    setProgreso(10)

    // Simula progreso gradual
    setTimeout(() => setProgreso(50),  500)
    setTimeout(() => setProgreso(90),  1200)
    setTimeout(() => setProgreso(100), 1800)

    // Muestra resultado después de 2.5 segundos
    setTimeout(() => {
      setAnalizando(false)
      setResultado({
        estado:    'DERRAME DETECTADO',
        area:      '2.4 km²',
        confianza: '87%',
        severidad: 'Media',
      })
    }, 2500)
  }

  return (
    <>
      <h1 className="seccion-titulo">🛢️ Nueva Detección</h1>
      <p className="seccion-subtitulo">Carga una imagen satelital para detectar derrames de petróleo</p>

      <div className="row g-3">

        {/* ── Columna izquierda: formulario ────────────── */}
        <div className="col-md-6">
          <div className="card-custom">
            <h5 style={{ color: '#ccc', marginBottom: 20 }}>📁 Cargar Imagen</h5>

            {/* Zona de carga clickeable */}
            <div className="zona-carga" onClick={() => inputRef.current.click()}>
              <span className="zona-carga-icon">🛰️</span>
              <p style={{ color: '#aaa', margin: 0 }}>
                Haz clic aquí para seleccionar<br />una imagen satelital
              </p>
              <p style={{ color: '#666', fontSize: '0.8rem', marginTop: 8 }}>
                Formatos: JPG, PNG, TIF
              </p>
            </div>

            {/* Input oculto — se activa al hacer clic en la zona */}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleArchivo}
            />

            {/* Vista previa de la imagen seleccionada */}
            {preview && (
              <img
                src={preview}
                alt="Vista previa"
                style={{ width: '100%', borderRadius: 10, marginTop: 15 }}
              />
            )}

            {/* Campos adicionales */}
            <div style={{ marginTop: 20 }}>
              <label className="form-label">Fecha de captura</label>
              <input type="date" className="input-custom" />

              <label className="form-label">Zona de monitoreo</label>
              <select className="input-custom">
                <option>Selecciona una zona...</option>
                <option>Loreto, Perú</option>
                <option>Napo, Ecuador</option>
                <option>Sucumbíos, Ecuador</option>
                <option>Putumayo, Colombia</option>
              </select>
            </div>

            <button className="btn-principal" onClick={handleAnalizar} disabled={analizando}>
              {analizando ? '⏳ Analizando...' : '🔍 Analizar Imagen'}
            </button>
          </div>
        </div>

        {/* ── Columna derecha: resultado ───────────────── */}
        <div className="col-md-6">
          <div className="card-custom" style={{ minHeight: 300 }}>
            <h5 style={{ color: '#ccc', marginBottom: 20 }}>📊 Resultado del Análisis</h5>

            {/* Barra de progreso (visible mientras analiza) */}
            {analizando && (
              <>
                <p style={{ color: '#aaa', fontSize: '0.85rem' }}>
                  Procesando imagen con modelo IA...
                </p>
                <div className="barra-wrapper">
                  <div className="barra-fill" style={{ width: `${progreso}%` }} />
                </div>
              </>
            )}

            {/* Resultado final */}
            {resultado && (
              <div style={{ marginTop: 20 }}>
                <p style={{ color: '#ff6b6b', fontWeight: 700, fontSize: '1.1rem' }}>
                  ⚠️ {resultado.estado}
                </p>
                <div style={{ marginTop: 15, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div><span style={{ color: '#888' }}>Área estimada:</span> <strong style={{ color: '#fff' }}>{resultado.area}</strong></div>
                  <div><span style={{ color: '#888' }}>Confianza IA:</span>  <strong style={{ color: '#fff' }}>{resultado.confianza}</strong></div>
                  <div><span style={{ color: '#888' }}>Severidad:</span>     <strong style={{ color: '#f0a500' }}>{resultado.severidad}</strong></div>
                </div>
              </div>
            )}

            {/* Estado vacío inicial */}
            {!analizando && !resultado && (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#555' }}>
                <span style={{ fontSize: '3rem' }}>🤖</span>
                <p style={{ marginTop: 10 }}>
                  El resultado aparecerá aquí<br />después de analizar la imagen
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  )
}
