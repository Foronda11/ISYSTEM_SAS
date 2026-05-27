# ISYSTEM S.A.S - Landing Page

Landing page corporativa profesional para ISYSTEM S.A.S, empresa de soluciones integrales en SST, Gestión Ambiental, Calidad y Riesgo Psicosocial.

## 🚀 Instalación y uso

### Requisitos
- Node.js 16+ 
- npm o yarn

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno (ver abajo)

# 3. Iniciar servidor
npm start

# Desarrollo (con auto-reload)
npm run dev
```

El sitio quedará disponible en `http://localhost:3000`

## ⚙️ Configuración del correo

Para que el formulario de contacto funcione, configura las variables de entorno:

### Opción A: Variables de entorno
```bash
# Linux/Mac
export EMAIL_USER=sforonda10@gmail.com
export EMAIL_PASS=tu_app_password_aqui

# Windows
set EMAIL_USER=sforonda10@gmail.com
set EMAIL_PASS=tu_app_password_aqui
```

### Opción B: Archivo .env
Crea un archivo `.env` en la raíz del proyecto:
```
EMAIL_USER=sforonda10@gmail.com
EMAIL_PASS=tu_app_password_aqui
PORT=3000
```
Instala dotenv: `npm install dotenv` y agrega `require('dotenv').config()` al inicio de `server.js`.

### Generar App Password para Gmail
1. Ve a https://myaccount.google.com/apppasswords
2. Selecciona "Correo" y "Windows"
3. Copia la contraseña generada (16 caracteres)
4. Úsala como `EMAIL_PASS`

> ⚠️ **Importante**: Activa la verificación en 2 pasos en tu cuenta Google antes de generar el App Password.

## 📁 Estructura del proyecto

```
/isystem
 ├── public/
 │    ├── css/
 │    │    └── styles.css        # Estilos principales
 │    ├── js/
 │    │    └── main.js           # JavaScript principal
 │    ├── images/                # Imágenes (agregar aquí)
 │    └── index.html             # Página principal
 ├── server.js                   # Servidor Express + Nodemailer
 ├── package.json
 └── README.md
```

## 🌐 Deploy en producción

### Heroku
```bash
heroku create isystem-landing
heroku config:set EMAIL_USER=sforonda10@gmail.com
heroku config:set EMAIL_PASS=tu_app_password
git push heroku main
```

### Railway / Render
1. Conecta tu repositorio GitHub
2. Configura las variables de entorno en el dashboard
3. Deploy automático

## 📱 Características
- ✅ Diseño 100% responsive
- ✅ Formulario de contacto con Nodemailer
- ✅ Botón flotante de WhatsApp
- ✅ Animaciones suaves al hacer scroll
- ✅ Contador de estadísticas animado
- ✅ SEO básico optimizado
- ✅ Navbar fija con efecto scroll
- ✅ Sección de testimonios
- ✅ 4 tarjetas de servicios interactivas

## 📞 Contacto ISYSTEM S.A.S
- WhatsApp: +57 312 736 2196
- Email: sforonda10@gmail.com
