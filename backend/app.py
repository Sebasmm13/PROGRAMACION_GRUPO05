# ============================================================
# app.py — Backend principal DetectOil IA
# Framework: Flask + PostgreSQL/SQLite
# ============================================================

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from PIL import Image
import tensorflow as tf
import numpy as np
import json
from pathlib import Path
from datetime import datetime

# Creamos la aplicación Flask
app = Flask(__name__)

# Habilitamos CORS para conectar React con Flask
CORS(app)

# ============================================================
# CONFIGURACIÓN DE BASE DE DATOS
# Si existe DATABASE_URL (en Render), usa PostgreSQL.
# Si no (en local), usa un archivo SQLite temporal.
# ============================================================

# Render a veces usa 'postgres://' en vez de 'postgresql://', SQLAlchemy requiere el segundo.
db_url = os.environ.get('DATABASE_URL', 'sqlite:///local.db')
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modelo de la Base de Datos
class Historial(db.Model):
    __tablename__ = 'historial'
    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.String(50), nullable=False)
    zona = db.Column(db.String(100), nullable=False)
    resultado = db.Column(db.String(100), nullable=False)
    clase_tecnica = db.Column(db.String(50), nullable=False)
    confianza = db.Column(db.Float, nullable=False)
    probabilidad_derrame = db.Column(db.Float, nullable=False)
    probabilidad_sin_derrame = db.Column(db.Float, nullable=False)
    nivel_alerta = db.Column(db.String(50), nullable=False)
    recomendacion = db.Column(db.Text, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        # Formatea el ID con ceros a la izquierda, ej. #001
        return {
            "id": f"#{str(self.id).zfill(3)}",
            "fecha": self.fecha,
            "zona": self.zona,
            "resultado": self.resultado,
            "clase_tecnica": self.clase_tecnica,
            "confianza": self.confianza,
            "probabilidad_derrame": self.probabilidad_derrame,
            "probabilidad_sin_derrame": self.probabilidad_sin_derrame,
            "nivel_alerta": self.nivel_alerta,
            "recomendacion": self.recomendacion,
            "timestamp": self.timestamp.isoformat() + "Z"
        }

# Crear las tablas en la BD si no existen
with app.app_context():
    db.create_all()

# ============================================================
# CREDENCIALES DE PRUEBA
# ============================================================

USUARIO_VALIDO = "admin"
CLAVE_VALIDA = "1234"

# ============================================================
# CARGA DEL MODELO ENTRENADO
# ============================================================

MODEL_PATH = Path("models/detectoil_model.keras")
CLASSES_PATH = Path("models/class_names.json")

model = tf.keras.models.load_model(MODEL_PATH)

with open(CLASSES_PATH, "r") as f:
    class_names = json.load(f)

print("Modelo cargado correctamente")
print("Clases:", class_names)

# ============================================================
# RUTAS DE LA API
# ============================================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Backend DetectOil IA funcionando correctamente (Conectado a BD)"
    })

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    usuario = data.get("usuario")
    clave = data.get("clave")

    if usuario == USUARIO_VALIDO and clave == CLAVE_VALIDA:
        return jsonify({"success": True, "usuario": usuario})
    return jsonify({"success": False, "message": "Usuario o contraseña incorrectos."})

@app.route("/api/predict", methods=["POST"])
def predict():
    if "imagen" not in request.files:
        return jsonify({"success": False, "message": "No se envió ninguna imagen."}), 400

    file = request.files["imagen"]
    fecha = request.form.get("fecha", "No especificada")
    zona = request.form.get("zona", "No especificada")

    if not fecha: fecha = "No especificada"
    if not zona: zona = "No especificada"

    try:
        # Abrimos la imagen, la convertimos a escala de grises y la redimensionamos
        img = Image.open(file).convert("L")
        img = img.resize((128, 128))

        # Convertimos la imagen a arreglo numérico
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=-1)
        img_array = np.expand_dims(img_array, axis=0)

        # Predicción del modelo
        prediccion = model.predict(img_array)[0][0]

        probabilidad_derrame = float(prediccion)
        probabilidad_sin_derrame = 1 - probabilidad_derrame

        if probabilidad_derrame >= 0.5:
            resultado = "Derrame detectado"
            clase_tecnica = "oil"
            confianza = probabilidad_derrame
        else:
            resultado = "Sin indicios de derrame"
            clase_tecnica = "no_oil"
            confianza = probabilidad_sin_derrame

        # Nivel de alerta según probabilidad
        if probabilidad_derrame >= 0.75:
            nivel_alerta = "Alto"
            recomendacion = "Se recomienda realizar una verificación adicional y reportar la posible presencia de hidrocarburos en la zona monitoreada."
        elif probabilidad_derrame >= 0.5:
            nivel_alerta = "Medio"
            recomendacion = "Se identifican posibles indicios de derrame. Se recomienda continuar con el monitoreo y validar la imagen."
        else:
            nivel_alerta = "Bajo"
            recomendacion = "No se identifican indicios relevantes de derrame. Se recomienda mantener el monitoreo preventivo."

        # GUARDAR EN LA BASE DE DATOS
        nuevo_registro = Historial(
            fecha=fecha,
            zona=zona,
            resultado=resultado,
            clase_tecnica=clase_tecnica,
            confianza=round(confianza * 100, 2),
            probabilidad_derrame=round(probabilidad_derrame * 100, 2),
            probabilidad_sin_derrame=round(probabilidad_sin_derrame * 100, 2),
            nivel_alerta=nivel_alerta,
            recomendacion=recomendacion
        )
        db.session.add(nuevo_registro)
        db.session.commit()

        # Retornamos los datos al frontend (incluyendo el ID autogenerado)
        return jsonify({
            "success": True,
            **nuevo_registro.to_dict()
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "message": f"Error al procesar la imagen: {str(e)}"
        }), 500

# ============================================================
# RUTAS DE HISTORIAL (BASE DE DATOS)
# ============================================================

@app.route("/api/historial", methods=["GET"])
def get_historial():
    # Retorna todo el historial ordenado de más reciente a más antiguo
    registros = Historial.query.order_by(Historial.timestamp.desc()).all()
    return jsonify([r.to_dict() for r in registros])

@app.route("/api/recientes", methods=["GET"])
def get_recientes():
    # Retorna los últimos 5 registros
    registros = Historial.query.order_by(Historial.timestamp.desc()).limit(5).all()
    return jsonify([r.to_dict() for r in registros])

@app.route("/api/estadisticas", methods=["GET"])
def get_estadisticas():
    # Calcula las estadísticas generales
    total = Historial.query.count()
    derramados = Historial.query.filter_by(clase_tecnica='oil').count()
    limpios = Historial.query.filter_by(clase_tecnica='no_oil').count()
    
    return jsonify({
        "totalAnalisis": total,
        "derramados": derramados,
        "limpios": limpios
    })

# ============================================================
# EJECUCIÓN DEL SERVIDOR
# ============================================================

if __name__ == "__main__":
    app.run(debug=True)