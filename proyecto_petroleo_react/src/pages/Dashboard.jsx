// ============================================================
// Dashboard.jsx — Layout principal: Sidebar + Sección activa
// Props: seccion (string) — indica qué sección mostrar
// ============================================================
import { useLocation }    from 'react-router-dom'
import Sidebar            from '../components/Sidebar'
import Inicio             from './sections/Inicio'
import NuevaDeteccion     from './sections/NuevaDeteccion'
import Historial          from './sections/Historial'
import Informacion        from './sections/Informacion'

// Mapa: nombre de sección → componente React correspondiente
const SECCIONES = {
  inicio:          <Inicio />,
  nueva_deteccion: <NuevaDeteccion />,
  historial:       <Historial />,
  informacion:     <Informacion />,
}

export default function Dashboard({ seccion }) {
  const location = useLocation()  // Para saber la URL actual (resalta el ítem activo)

  return (
    <div>
      {/* Menú lateral — recibe la ruta actual para resaltar el ítem correcto */}
      <Sidebar seccionActiva={location.pathname} />

      {/* Contenido principal */}
      <main className="main-content">
        {/* Renderiza el componente correspondiente a la sección */}
        {SECCIONES[seccion] ?? <p style={{ color: '#888' }}>Sección no encontrada.</p>}
      </main>
    </div>
  )
}
