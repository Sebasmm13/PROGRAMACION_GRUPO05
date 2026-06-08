// ============================================================
// Informacion.jsx — Sección 4: Descripción del proyecto
// ============================================================

// Datos del equipo — Grupo 05 (5 integrantes)
const EQUIPO = [
  { emoji: '👩💻', nombre: 'Integrante 1', rol: 'Frontend' },
  { emoji: '👨💻', nombre: 'Integrante 2', rol: 'Backend' },
  { emoji: '👩🔬', nombre: 'Integrante 3', rol: 'Modelo IA' },
  { emoji: '👨🎨', nombre: 'Integrante 4', rol: 'Diseño / UX' },
  { emoji: '🧑💼', nombre: 'Integrante 5', rol: 'Investigación' },
]

// Tecnologías usadas
const TECNOLOGIAS = [
  { label: 'Frontend',                valor: 'React 18 + Vite, HTML5, CSS3, Bootstrap 5' },
  { label: 'Backend',                 valor: 'Python 3 + Flask, Flask-CORS' },
  { label: 'Inteligencia Artificial', valor: 'TensorFlow / Keras — Red Neuronal Convolucional (CNN)' },
  { label: 'Imágenes',                valor: 'Imágenes SAR (Radar de Apertura Sintética)' },
  { label: 'Base de datos (próximo)', valor: 'PostgreSQL' },
]

export default function Informacion() {
  return (
    <>
      <h1 className="seccion-titulo">📚 Información del Sistema</h1>
      <p className="seccion-subtitulo">Conoce más sobre el proyecto, la tecnología y el equipo detrás</p>

      <div className="row g-3">

        {/* Card: Qué es el sistema */}
        <div className="col-12">
          <div className="card-custom">
            <h5 style={{ color: '#4caf50', marginBottom: 12 }}>🎯 ¿Qué es DetectOil IA?</h5>
            <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.9 }}>
              <strong style={{ color: '#fff' }}>DetectOil IA</strong> es una aplicación web inteligente
              diseñada para la <strong style={{ color: '#fff' }}>detección de derrames de petróleo en
              entornos marítimos</strong> mediante técnicas de{' '}
              <strong style={{ color: '#fff' }}>Aprendizaje Profundo (Deep Learning)</strong>.
            </p>
            <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.9, marginTop: 12 }}>
              Los derrames de petróleo en el mar representan una de las amenazas ambientales más
              devastadoras para los ecosistemas marinos. Cada año, millones de litros de crudo se
              vierten en los océanos debido a accidentes industriales, fugas en plataformas offshore
              y naufragios de buques petroleros. Estos derrames causan la muerte masiva de fauna
              marina, destruyen hábitats costeros, contaminan las cadenas alimentarias y generan
              un impacto económico severo en comunidades pesqueras y turísticas.
            </p>
            <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.9, marginTop: 12 }}>
              Nuestro sistema utiliza <strong style={{ color: '#fff' }}>imágenes SAR (Radar de Apertura
              Sintética)</strong> capturadas por satélites como Sentinel-1, que pueden penetrar nubes
              y operar tanto de día como de noche. Una <strong style={{ color: '#fff' }}>Red Neuronal
              Convolucional (CNN)</strong> entrenada con un dataset especializado analiza estas imágenes
              y clasifica automáticamente si existe presencia de hidrocarburos en la superficie
              del agua, permitiendo una respuesta rápida y eficiente ante posibles emergencias.
            </p>
          </div>
        </div>

        {/* Card: Cómo funciona */}
        <div className="col-md-6">
          <div className="card-custom">
            <h5 style={{ color: '#f0a500', marginBottom: 15 }}>⚙️ ¿Cómo funciona?</h5>
            <ol style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 2.2, paddingLeft: 20 }}>
              <li>El usuario carga una <strong style={{ color: '#ccc' }}>imagen SAR</strong> de la zona marítima a monitorear</li>
              <li>La imagen se <strong style={{ color: '#ccc' }}>preprocesa</strong>: se convierte a escala de grises y se redimensiona a 128×128 píxeles</li>
              <li>El <strong style={{ color: '#ccc' }}>modelo CNN</strong> analiza los patrones de la imagen buscando características de derrames (manchas oscuras, texturas irregulares)</li>
              <li>La red neuronal emite una <strong style={{ color: '#ccc' }}>predicción con función sigmoide</strong>: valores cercanos a 1 indican presencia de petróleo (oil), cercanos a 0 indican agua limpia (no_oil)</li>
              <li>Se genera un <strong style={{ color: '#ccc' }}>reporte automático</strong> con la confianza del modelo, nivel de alerta y recomendaciones</li>
              <li>El resultado queda <strong style={{ color: '#ccc' }}>registrado en el historial</strong> para consulta y seguimiento</li>
            </ol>
          </div>
        </div>

        {/* Card: Tecnologías */}
        <div className="col-md-6">
          <div className="card-custom">
            <h5 style={{ color: '#2980b9', marginBottom: 15 }}>🛠️ Tecnologías Utilizadas</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {TECNOLOGIAS.map((t, i) => (
                <div key={i}>
                  <strong style={{ color: '#fff' }}>{t.label}:</strong>{' '}
                  <span style={{ color: '#aaa' }}>{t.valor}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, padding: '12px 15px', background: 'rgba(41,128,185,0.15)', borderRadius: 10, borderLeft: '3px solid #2980b9' }}>
              <p style={{ color: '#8bb8d4', fontSize: '0.82rem', margin: 0, lineHeight: 1.6 }}>
                💡 <strong>Dato técnico:</strong> El modelo fue entrenado con un dataset de
                imágenes SAR etiquetadas (oil / no_oil), alcanzando una precisión de ~92%
                en la detección de derrames de petróleo en superficie marina.
              </p>
            </div>
          </div>
        </div>

        {/* Card: Contexto del problema */}
        <div className="col-12">
          <div className="card-custom">
            <h5 style={{ color: '#e74c3c', marginBottom: 15 }}>🌊 ¿Por qué es importante?</h5>
            <div className="row g-3">
              <div className="col-md-4" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🐋</div>
                <strong style={{ color: '#fff', fontSize: '0.9rem' }}>Ecosistemas marinos</strong>
                <p style={{ color: '#aaa', fontSize: '0.82rem', marginTop: 6, lineHeight: 1.6 }}>
                  Un solo derrame puede afectar miles de especies marinas, desde
                  plancton hasta mamíferos como ballenas y delfines.
                </p>
              </div>
              <div className="col-md-4" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>⏱️</div>
                <strong style={{ color: '#fff', fontSize: '0.9rem' }}>Detección temprana</strong>
                <p style={{ color: '#aaa', fontSize: '0.82rem', marginTop: 6, lineHeight: 1.6 }}>
                  La respuesta en las primeras horas es crítica. La IA permite
                  detectar derrames mucho más rápido que la inspección manual.
                </p>
              </div>
              <div className="col-md-4" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>💰</div>
                <strong style={{ color: '#fff', fontSize: '0.9rem' }}>Impacto económico</strong>
                <p style={{ color: '#aaa', fontSize: '0.82rem', marginTop: 6, lineHeight: 1.6 }}>
                  El desastre de Deepwater Horizon (2010) derramó 4.9 millones de
                  barriles y costó más de $65 mil millones en daños.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card: Equipo */}
        <div className="col-12">
          <div className="card-custom">
            <h5 style={{ color: '#9b59b6', marginBottom: 15 }}>👥 Equipo de Desarrollo — Grupo 05</h5>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 30 }}>
              {EQUIPO.map((m, i) => (
                <div key={i} style={{ textAlign: 'center', minWidth: 120 }}>
                  <div style={{ fontSize: '2.5rem' }}>{m.emoji}</div>
                  <div style={{ color: '#fff', fontWeight: 600, marginTop: 8 }}>{m.nombre}</div>
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>{m.rol}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
