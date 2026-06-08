// ============================================================
// Inicio.jsx — Sección 1: Panel principal con estadísticas
// Datos dinámicos desde el historial de análisis (localStorage)
// ============================================================
import { useEffect, useState } from 'react'
import { obtenerEstadisticas, obtenerRecientes } from '../../services/historialService'

// Componente de contador animado
function Contador({ meta, sufijo = '' }) {
  const [valor, setValor] = useState(0)

  useEffect(() => {
    if (meta === 0) { setValor(0); return }
    let actual = 0
    const paso = Math.ceil(meta / 40)
    const timer = setInterval(() => {
      actual += paso
      if (actual >= meta) { actual = meta; clearInterval(timer) }
      setValor(actual)
    }, 40)
    return () => clearInterval(timer)
  }, [meta])

  return <span>{valor}{sufijo}</span>
}

export default function Inicio() {
  const [stats, setStats] = useState({ totalAnalisis: 0, derramados: 0, limpios: 0 })
  const [recientes, setRecientes] = useState([])

  // Cargar estadísticas y actividad reciente al montar el componente
  useEffect(() => {
    setStats(obtenerEstadisticas())
    setRecientes(obtenerRecientes(5))
  }, [])

  // Tarjetas de estadísticas dinámicas
  const STATS = [
    { icono: '🔍', color: 'azul', meta: stats.totalAnalisis, label: 'Análisis realizados' },
    { icono: '🛢️', color: 'rojo', meta: stats.derramados, label: 'Derrames identificados' },
    { icono: '✅', color: 'verde', meta: stats.limpios, label: 'Análisis limpios' },
    { icono: '🤖', color: 'amarillo', meta: 92, label: 'Precisión del modelo', sufijo: '%' },
  ]

  return (
    <>
      <h1 className="seccion-titulo">🏠 Panel Principal</h1>
      <p className="seccion-subtitulo">Resumen general del sistema de detección marítima</p>

      {/* Fila de estadísticas */}
      <div className="row g-3 mb-4">
        {STATS.map((s, i) => (
          <div className="col-md-3" key={i}>
            <div className="card-custom">
              <div className="stat-card">
                <div className={`stat-icon ${s.color}`}>{s.icono}</div>
                <div>
                  <div className="stat-numero">
                    <Contador meta={s.meta} sufijo={s.sufijo} />
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabla de actividad reciente — datos reales */}
      <div className="card-custom">
        <h5 style={{ marginBottom: 15, color: '#ccc' }}>📋 Actividad Reciente</h5>

        {recientes.length > 0 ? (
          <table className="tabla-custom">
            <thead>
              <tr>
                <th>Fecha</th><th>Zona Marítima</th><th>Resultado</th><th>Confianza</th><th>Alerta</th>
              </tr>
            </thead>
            <tbody>
              {recientes.map((a, i) => (
                <tr key={i}>
                  <td>{a.fecha}</td>
                  <td>{a.zona}</td>
                  <td style={{ color: a.clase_tecnica === 'oil' ? '#ff6b6b' : '#4caf50' }}>
                    {a.clase_tecnica === 'oil' ? '⚠️ Derrame' : '✅ Limpio'}
                  </td>
                  <td>{a.confianza}%</td>
                  <td>
                    <span className={`badge-estado badge-${a.nivel_alerta === 'Alto' ? 'alto' : a.nivel_alerta === 'Medio' ? 'medio' : 'bajo'}`}>
                      {a.nivel_alerta}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#555' }}>
            <span style={{ fontSize: '2.5rem' }}>🌊</span>
            <p style={{ marginTop: 10, color: '#666', fontSize: '0.9rem' }}>
              No hay análisis registrados aún.<br />
              Ve a <strong style={{ color: '#aaa' }}>Nueva Detección</strong> para comenzar.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
