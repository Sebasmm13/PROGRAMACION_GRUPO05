// ============================================================
// Login.jsx — Página de inicio de sesión
// ============================================================
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Credenciales de prueba (en producción vendrían del backend)
const USUARIO_VALIDO = 'admin'
const CLAVE_VALIDA = '1234'

export default function Login() {
  // useState: variables que React actualiza automáticamente en la pantalla
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()  // Para navegar a otra página

  // Se ejecuta cuando el usuario presiona "Ingresar"
  function handleSubmit(e) {
    e.preventDefault()  // Evita que la página se recargue

    if (usuario === USUARIO_VALIDO && clave === CLAVE_VALIDA) {
      // Guardamos sesión en localStorage (memoria del navegador)
      localStorage.setItem('usuario', usuario)
      navigate('/inicio')  // Redirigimos al dashboard
    } else {
      setError('Usuario o contraseña incorrectos.')
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* Logo y título */}
        <div className="login-logo">🛢️</div>
        <div className="login-titulo">DetectOil IA</div>
        <div className="login-subtitulo">
          Sistema de Detección de Derrames en la Amazonía
        </div>

        {/* Mensaje de error (solo aparece si error !== '') */}
        {error && <div className="alerta-error">❌ {error}</div>}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>

          <label className="form-label">Usuario</label>
          <input
            type="text"
            className="form-field"
            placeholder="Ingresa tu usuario"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}  // Actualiza el estado
            required
          />

          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-field"
            placeholder="Ingresa tu contraseña"
            value={clave}
            onChange={e => setClave(e.target.value)}
            required
          />

          <div style={{ height: 10 }} />

          <button type="submit" className="btn-ingresar">
            🔐 Ingresar al Sistema
          </button>
        </form>

        {/* Nota de demo (quitar en producción) */}
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#555', marginTop: 20 }}>
          🧪 Demo: <strong style={{ color: '#888' }}>admin</strong> / <strong style={{ color: '#888' }}>1234</strong>
        </p>

      </div>
    </div>
  )
}