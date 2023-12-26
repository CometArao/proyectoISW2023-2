const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "84a0a79610b71a",
      pass: "68945da02c9dd6",
    },
  });

/**
 * Sends a notification of card issuance to the specified email address.
 * @param {string} correo - The email address to send the notification to.
 * @param {object} infoTarjeta - The card information.
 */
const enviarNotificacionDeEmision = async (correo, infoTarjeta) => {
    const mailOptions = {
        from: "admin@tuapp.com",
        to: correo,
        subject: "Tu Tarjeta Vecino ha sido emitida",
        text: "Tu tarjeta ha sido emitida. Estado: " 
        + infoTarjeta.estado + ". Vence: " + infoTarjeta.fechaVencimiento + ".",
        attachments: [
            { filename: "tarjeta.pdf", path: pathPDF },
          ],
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        // console.error(`Error al enviar correo: ${error.message}`);
        throw error;
    }
};

module.exports = { enviarNotificacionDeEmision };
