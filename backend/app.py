from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Habilitamos CORS para que el frontend en React pueda comunicarse con esta API
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "API de DetectOil en Flask funcionando correctamente"})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    usuario = data.get('usuario')
    clave = data.get('clave')

    # Credenciales de prueba
    USUARIO_VALIDO = 'admin'
    CLAVE_VALIDA = '1234'

    if usuario == USUARIO_VALIDO and clave == CLAVE_VALIDA:
        # TODO: A futuro aquí se consultará la base de datos PostgreSQL
        return jsonify({
            "success": True,
            "token": "mock-jwt-token-flask",
            "usuario": usuario
        })
    else:
        return jsonify({
            "success": False,
            "message": "Usuario o contraseña incorrectos"
        }), 401

if __name__ == '__main__':
    # Puerto por defecto en Flask es 5000
    app.run(debug=True, port=5000)
