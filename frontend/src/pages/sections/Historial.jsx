// ============================================================
// Historial.jsx — Sección 3: Tabla con todos los análisis
// Datos reales desde localStorage (preparado para PostgreSQL)
// ============================================================
import { useState, useEffect } from 'react'
import { obtenerHistorial } from '../../services/historialService'

export default function Historial() {
  const [busqueda, setBusqueda] = useState('')
  const [datos, setDatos] = useState([])
  const [detalle, setDetalle] = useState(null)

  // Cargar historial real al montar el componente
  useEffect(() => {
    setDatos(obtenerHistorial())
  }, [])

  // Filtra las filas según el texto buscado
  const datosFiltrados = datos.filter(d =>
    Object.values(d).join(' ').toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <>
      <h1 className="seccion-titulo">📊 Historial de Detecciones</h1>
      <p className="seccion-subtitulo">Registro de todos los análisis realizados en el sistema</p>

      {/* Barra de búsqueda */}
      <div className="card-custom" style={{ padding: '15px 20px', marginBottom: 15 }}>
        <input
          type="text"
          className="input-custom"
          placeholder="🔍 Buscar por fecha, zona marítima o resultado..."
          style={{ marginBottom: 0 }}
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <div className="card-custom">
        <table className="tabla-custom">
          <thead>
            <tr>
              <th>#</th><th>Fecha</th><th>Zona Marítima</th>
              <th>Resultado</th><th>Confianza IA</th><th>Nivel Alerta</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.length > 0 ? (
              datosFiltrados.map(d => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.fecha}</td>
                  <td>{d.zona}</td>
                  <td style={{ color: d.clase_tecnica === 'oil' ? '#ff6b6b' : '#4caf50' }}>
                    {d.clase_tecnica === 'oil' ? '⚠️ Derrame' : '✅ Limpio'}
                  </td>
                  <td>{d.confianza}%</td>
                  <td>
                    <span className={`badge-estado badge-${d.nivel_alerta === 'Alto' ? 'alto' : d.nivel_alerta === 'Medio' ? 'medio' : 'bajo'}`}>
                      {d.nivel_alerta}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-principal btn-sm"
                      onClick={() => setDetalle(detalle?.id === d.id ? null : d)}
                    >
                      {detalle?.id === d.id ? 'Cerrar' : 'Ver'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: '#666', padding: 40 }}>
                  {datos.length === 0 ? (
                    <>
                      <span style={{ fontSize: '2rem' }}>🌊</span>
                      <p style={{ marginTop: 8, marginBottom: 0 }}>
                        No hay análisis registrados aún.<br />
                        Realiza tu primer análisis en <strong style={{ color: '#aaa' }}>Nueva Detección</strong>.
                      </p>
                    </>
                  ) : (
                    'No se encontraron registros con esa búsqueda.'
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Panel de detalle expandido */}
      {detalle && (
        <div className="card-custom" style={{ borderLeft: `3px solid ${detalle.clase_tecnica === 'oil' ? '#c0392b' : '#0d6e3f'}` }}>
          <h5 style={{ color: '#ccc', marginBottom: 15 }}>📋 Detalle del Análisis {detalle.id}</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <span style={{ color: '#888' }}>Resultado:</span>{' '}
                  <strong style={{ color: detalle.clase_tecnica === 'oil' ? '#ff6b6b' : '#4caf50' }}>
                    {detalle.resultado}
                  </strong>
                </div>
                <div>
                  <span style={{ color: '#888' }}>Confianza IA:</span>{' '}
                  <strong style={{ color: '#fff' }}>{detalle.confianza}%</strong>
                </div>
                <div>
                  <span style={{ color: '#888' }}>Probabilidad de derrame:</span>{' '}
                  <strong style={{ color: '#fff' }}>{detalle.probabilidad_derrame}%</strong>
                </div>
                <div>
                  <span style={{ color: '#888' }}>Probabilidad sin derrame:</span>{' '}
                  <strong style={{ color: '#fff' }}>{detalle.probabilidad_sin_derrame}%</strong>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <span style={{ color: '#888' }}>Fecha de captura:</span>{' '}
                  <strong style={{ color: '#fff' }}>{detalle.fecha}</strong>
                </div>
                <div>
                  <span style={{ color: '#888' }}>Zona marítima:</span>{' '}
                  <strong style={{ color: '#fff' }}>{detalle.zona}</strong>
                </div>
                <div>
                  <span style={{ color: '#888' }}>Nivel de alerta:</span>{' '}
                  <strong style={{
                    color: detalle.nivel_alerta === 'Alto' ? '#ff6b6b'
                         : detalle.nivel_alerta === 'Medio' ? '#f0a500'
                         : '#4caf50'
                  }}>{detalle.nivel_alerta}</strong>
                </div>
                <div>
                  <span style={{ color: '#888' }}>Registrado:</span>{' '}
                  <strong style={{ color: '#fff' }}>
                    {new Date(detalle.timestamp).toLocaleString('es-PE')}
                  </strong>
                </div>
              </div>
            </div>
          </div>
          {detalle.recomendacion && (
            <div style={{
              marginTop: 15,
              padding: '12px 15px',
              background: detalle.clase_tecnica === 'oil'
                ? 'rgba(192,57,43,0.15)' : 'rgba(13,110,63,0.15)',
              borderRadius: 10
            }}>
              <p style={{ color: '#ccc', fontSize: '0.85rem', margin: 0 }}>
                💡 {detalle.recomendacion}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
