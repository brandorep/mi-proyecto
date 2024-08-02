
import express from 'express';
import { urlencoded, json } from 'body-parser';
import { createTransport } from 'nodemailer';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

// Configuración de Nodemailer
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'camposbrando0@gmail.com',
    pass: 'dutg nxvh tycj fclm',
  },
});

// Endpoint para manejar el formulario
app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'camposbrando0@gmail.com',
    subject: subject,
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el email:', error);
      res.status(500).json({ success: false, message: 'Error al enviar el mensaje' });
    } else {
      console.log('Email enviado:', info.response);
      res.status(200).json({ success: true, message: 'Mensaje enviado exitosamente' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
