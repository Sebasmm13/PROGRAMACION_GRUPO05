// ============================================================
// historialService.js — Servicio de historial de análisis
// Conectado al backend mediante API REST
// ============================================================

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api'

/**
 * Obtener todo el historial de análisis
 * @returns {Promise<Array>} Lista de análisis
 */
export async function obtenerHistorial() {
  try {
    const response = await fetch(`${API_URL}/historial`)
    if (!response.ok) throw new Error('Error en petición')
    return await response.json()
  } catch (error) {
    console.error('Error al obtener historial del backend:', error)
    return []
  }
}

/**
 * Obtener estadísticas resumen del historial
 * @returns {Promise<Object>} { totalAnalisis, derramados, limpios }
 */
export async function obtenerEstadisticas() {
  try {
    const response = await fetch(`${API_URL}/estadisticas`)
    if (!response.ok) throw new Error('Error en petición')
    return await response.json()
  } catch (error) {
    console.error('Error al obtener estadísticas del backend:', error)
    return { totalAnalisis: 0, derramados: 0, limpios: 0 }
  }
}

/**
 * Obtener los últimos N análisis (para actividad reciente)
 * @returns {Promise<Array>}
 */
export async function obtenerRecientes() {
  try {
    const response = await fetch(`${API_URL}/recientes`)
    if (!response.ok) throw new Error('Error en petición')
    return await response.json()
  } catch (error) {
    console.error('Error al obtener recientes del backend:', error)
    return []
  }
}
