
import { transporter } from "./config.mail.js";
import { MailError } from "../../errors/TypeError.js";
import { emailHtmltemplate } from "./mailTemplates.js";

/**
 * Envía un correo electrónico a uno o más destinatarios
 * @param {Array<string>} to - Lista de destinatarios
 * @param {string} subject - Asunto del correo
 * @param {string} message - Contenido del correo
 * @returns - Detalle del envío
 */


export const sendMailService = async ({ to, subject, message }) => {
    try {
        
        const htmlTemplate = emailHtmltemplate(undefined, message); 

        const mailOptions = {
            from: process.env.SMTP_USER, 
            to: to.join(', '), 
            subject, 
            html: htmlTemplate, 
        };

        const infoData = await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito', infoData.messageId);

        return infoData; 
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw new MailError(error); 
    }
};
