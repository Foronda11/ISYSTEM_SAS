const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ============================================
// CONFIGURACIÓN DE NODEMAILER
// Edita con tus credenciales SMTP reales
// ============================================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'sforonda10@gmail.com',
    pass: process.env.EMAIL_PASS || 'TU_APP_PASSWORD_AQUI'
    // Para Gmail: genera una "App Password" en tu cuenta Google
    // https://myaccount.google.com/apppasswords
  }
});

// ============================================
// RUTA DE CONTACTO
// ============================================
app.post('/api/contact', async (req, res) => {
  const { nombre, empresa, telefono, correo, servicio, mensaje } = req.body;

  // Validación básica
  if (!nombre || !correo) {
    return res.status(400).json({ error: 'Nombre y correo son requeridos' });
  }

  const mailOptions = {
    from: `"ISYSTEM S.A.S - Formulario Web" <${process.env.EMAIL_USER || 'sforonda10@gmail.com'}>`,
    to: 'sforonda10@gmail.com',
    replyTo: correo,
    subject: `🔔 Nueva solicitud de asesoría - ${nombre}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #1a56db, #0891b2); padding: 30px; text-align: center; color: white; }
          .header h1 { margin: 0; font-size: 24px; }
          .header p { margin: 8px 0 0; opacity: 0.85; font-size: 14px; }
          .body { padding: 30px; }
          .field { margin-bottom: 20px; }
          .field label { display: block; font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
          .field value { display: block; font-size: 16px; color: #111827; font-weight: 500; }
          .divider { border: none; border-top: 1px solid #e5e7eb; margin: 20px 0; }
          .mensaje-box { background: #f9fafb; border-left: 4px solid #1a56db; padding: 15px; border-radius: 0 8px 8px 0; font-size: 15px; color: #374151; line-height: 1.6; }
          .footer { background: #f9fafb; padding: 20px 30px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
          .btn { display: inline-block; background: #25d366; color: white; text-decoration: none; padding: 12px 24px; border-radius: 50px; font-weight: 600; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏢 ISYSTEM S.A.S</h1>
            <p>Nueva solicitud de asesoría desde el sitio web</p>
          </div>
          <div class="body">
            <div class="field">
              <label>Nombre completo</label>
              <value>${nombre}</value>
            </div>
            <div class="field">
              <label>Empresa</label>
              <value>${empresa || 'No especificada'}</value>
            </div>
            <div class="field">
              <label>Teléfono</label>
              <value>${telefono || 'No proporcionado'}</value>
            </div>
            <div class="field">
              <label>Correo electrónico</label>
              <value><a href="mailto:${correo}">${correo}</a></value>
            </div>
            <div class="field">
              <label>Servicio de interés</label>
              <value>${servicio || 'No especificado'}</value>
            </div>
            <hr class="divider">
            <div class="field">
              <label>Mensaje</label>
              <div class="mensaje-box">${mensaje || 'Sin mensaje adicional'}</div>
            </div>
            <div style="text-align:center">
              <a href="https://wa.me/57${telefono ? telefono.replace(/\D/g,'') : '3127362196'}" class="btn">
                📱 Responder por WhatsApp
              </a>
            </div>
          </div>
          <div class="footer">
            ISYSTEM S.A.S · Soluciones integrales empresariales · Colombia<br>
            Este correo fue generado automáticamente desde el formulario web.
          </div>
        </div>
      </body>
      </html>
    `
  };

  // Correo de confirmación al cliente
  const confirmMail = {
    from: `"ISYSTEM S.A.S" <${process.env.EMAIL_USER || 'sforonda10@gmail.com'}>`,
    to: correo,
    subject: '✅ Recibimos tu solicitud - ISYSTEM S.A.S',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #1a56db, #0891b2); padding: 30px; text-align: center; color: white; }
          .body { padding: 30px; color: #374151; line-height: 1.6; }
          .btn { display: inline-block; background: #25d366; color: white; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-weight: 700; margin: 20px 0; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;color:white">¡Gracias, ${nombre}!</h1>
            <p style="margin:8px 0 0;opacity:0.85">Hemos recibido tu solicitud</p>
          </div>
          <div class="body">
            <p>Hola <strong>${nombre}</strong>,</p>
            <p>Gracias por contactar a <strong>ISYSTEM S.A.S</strong>. Hemos recibido tu solicitud de asesoría sobre <strong>${servicio || 'nuestros servicios'}</strong>.</p>
            <p>Un miembro de nuestro equipo se pondrá en contacto contigo a la brevedad posible para brindarle la información que necesita.</p>
            <p>Si necesitas atención inmediata, puedes contactarnos directamente:</p>
            <div style="text-align:center">
              <a href="https://wa.me/573127362196" class="btn">💬 Escribir por WhatsApp</a>
            </div>
            <p style="font-size:14px;color:#6b7280">📞 +57 312 736 2196<br>📧 sforonda10@gmail.com</p>
          </div>
          <div class="footer">
            ISYSTEM S.A.S · SST · Gestión Ambiental · Calidad · Riesgo Psicosocial
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmMail);
    res.json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
});

// ---- Serve index.html for all routes ----
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---- START SERVER ----
app.listen(PORT, () => {
  console.log(`\n🚀 ISYSTEM S.A.S server running on http://localhost:${PORT}\n`);
});

module.exports = app;
