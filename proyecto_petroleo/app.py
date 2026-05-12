# ============================================================
# app.py — Servidor principal del proyecto
# Framework: Flask (Python)
# ============================================================

from flask import Flask, render_template, request, redirect, url_for, session

# Creamos la app Flask
app = Flask(__name__)

# Clave secreta para manejar sesiones (cámbiala en producción)
app.secret_key = "clave_secreta_grupo05"

# ─── CREDENCIALES DE PRUEBA ──────────────────────────────────
# En producción estas irían en una base de datos
USUARIO_VALIDO = "admin"
CLAVE_VALIDA   = "1234"


# ─── RUTA: Login ─────────────────────────────────────────────
@app.route("/", methods=["GET", "POST"])
def login():
    error = None

    if request.method == "POST":
        usuario = request.form.get("usuario")
        clave   = request.form.get("clave")

        # Verificamos las credenciales
        if usuario == USUARIO_VALIDO and clave == CLAVE_VALIDA:
            session["usuario"] = usuario       # Guardamos la sesión
            return redirect(url_for("inicio"))  # Redirigimos al dashboard
        else:
            error = "Usuario o contraseña incorrectos."

    return render_template("login.html", error=error)


# ─── RUTA: Dashboard principal (Inicio) ──────────────────────
@app.route("/inicio")
def inicio():
    if "usuario" not in session:          # Si no hay sesión activa…
        return redirect(url_for("login"))  # …volvemos al login
    return render_template("dashboard.html", pagina="inicio")


# ─── RUTA: Nueva Detección ────────────────────────────────────
@app.route("/nueva-deteccion")
def nueva_deteccion():
    if "usuario" not in session:
        return redirect(url_for("login"))
    return render_template("dashboard.html", pagina="nueva_deteccion")


# ─── RUTA: Historial ─────────────────────────────────────────
@app.route("/historial")
def historial():
    if "usuario" not in session:
        return redirect(url_for("login"))
    return render_template("dashboard.html", pagina="historial")


# ─── RUTA: Información ───────────────────────────────────────
@app.route("/informacion")
def informacion():
    if "usuario" not in session:
        return redirect(url_for("login"))
    return render_template("dashboard.html", pagina="informacion")


# ─── RUTA: Cerrar sesión ─────────────────────────────────────
@app.route("/logout")
def logout():
    session.clear()                        # Borramos la sesión
    return redirect(url_for("login"))


# ─── PUNTO DE ENTRADA ────────────────────────────────────────
if __name__ == "__main__":
    app.run(debug=True)   # debug=True muestra errores en el navegador
