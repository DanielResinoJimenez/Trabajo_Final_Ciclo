const nodemailer = require('nodemailer');

// Configura el transporter con tus credenciales de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Puedes usar otros servicios como Outlook, Yahoo, etc.
    auth: {
        user: 'danielresinojimenez@gmail.com',  // Cambia esto por tu correo
        pass: 'gyla idon zhsb bwpv'  // Usa una contraseña de aplicación si usas Gmail
    }
});

// Función para enviar el correo
const sendPasswordResetEmail = async (toEmail, newPassword) => {
    const mailOptions = {
        from: '"MasCoffee" <danielresinojimenez@gmail.com>',  // Remitente
        to: toEmail,  // Destinatario
        subject: '🔐 Restablecimiento de Contraseña',
        text: `Puedes cambiar tu contraseña accediendo al siguiente enlace: http://localhost:5173/login/change-password?email=${toEmail}`,
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4a90e2;">Restablecimiento de Contraseña</h2>
          <p>Por favor, cambia tu contraseña lo antes posible haciendo clic en el siguiente botón:</p>
          <a href="http://localhost:5173/login/change-password?email=${toEmail}"
             style="display: inline-block; padding: 10px 20px; background-color: #4a90e2; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 10px;">
            Cambiar Contraseña
          </a>
          <p style="margin-top: 20px;">Si tú no solicitaste este cambio, por favor ignora este mensaje.</p>
          <p>Gracias,<br>El equipo de MasCoffee</p>
        </div>
      `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado exitosamente');
        return true;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        return false;
    }
};

module.exports = {
    sendPasswordResetEmail
};