// ============================================================
// historialService.js — Servicio de historial de análisis
// Actualmente usa localStorage. Cuando se conecte PostgreSQL,
// solo hay que cambiar estas funciones a fetch('/api/...').
// ============================================================

const STORAGE_KEY = 'detectoil_historial'

/**
 * Obtener todo el historial de análisis
 * @returns {Array} Lista de análisis ordenados del más reciente al más antiguo
 */
export function obtenerHistorial() {
  try {
    const datos = localStorage.getItem(STORAGE_KEY)
    return datos ? JSON.parse(datos) : []
  } catch {
    console.error('Error al leer historial del localStorage')
    return []
  }
}

/**
 * Guardar un nuevo análisis en el historial
 * @param {Object} analisis - Resultado del análisis de la IA
 * @param {string} analisis.resultado - "Derrame detectado" o "Sin indicios de derrame"
 * @param {string} analisis.clase_tecnica - "oil" o "no_oil"
 * @param {number} analisis.confianza - Porcentaje de confianza
 * @param {number} analisis.probabilidad_derrame - Probabilidad de derrame %
 * @param {number} analisis.probabilidad_sin_derrame - Probabilidad sin derrame %
 * @param {string} analisis.nivel_alerta - "Alto", "Medio" o "Bajo"
 * @param {string} analisis.fecha - Fecha de captura
 * @param {string} analisis.zona - Mar / zona marítima
 * @param {string} analisis.recomendacion - Recomendación del sistema
 */
export function guardarAnalisis(analisis) {
  try {
    const historial = obtenerHistorial()

    const nuevoRegistro = {
      id: `#${String(historial.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString(),
      fecha: analisis.fecha || new Date().toISOString().split('T')[0],
      zona: analisis.zona || 'No especificada',
      resultado: analisis.resultado,
      clase_tecnica: analisis.clase_tecnica,
      confianza: analisis.confianza,
      probabilidad_derrame: analisis.probabilidad_derrame,
      probabilidad_sin_derrame: analisis.probabilidad_sin_derrame,
      nivel_alerta: analisis.nivel_alerta,
      recomendacion: analisis.recomendacion,
    }

    // Agregar al inicio (más reciente primero)
    historial.unshift(nuevoRegistro)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(historial))
    return nuevoRegistro
  } catch {
    console.error('Error al guardar análisis en localStorage')
    return null
  }
}

/**
 * Obtener estadísticas resumen del historial
 * @returns {Object} { totalAnalisis, derramados, limpios }
 */
export function obtenerEstadisticas() {
  const historial = obtenerHistorial()

  return {
    totalAnalisis: historial.length,
    derramados: historial.filter(h => h.clase_tecnica === 'oil').length,
    limpios: historial.filter(h => h.clase_tecnica === 'no_oil').length,
  }
}

/**
 * Obtener los últimos N análisis (para actividad reciente)
 * @param {number} cantidad - Número de registros a obtener
 * @returns {Array}
 */
export function obtenerRecientes(cantidad = 5) {
  return obtenerHistorial().slice(0, cantidad)
}

/**
 * Limpiar todo el historial (útil para testing)
 */
export function limpiarHistorial() {
  localStorage.removeItem(STORAGE_KEY)
}
