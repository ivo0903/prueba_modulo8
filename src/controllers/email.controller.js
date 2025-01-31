
import { sendMailService } from '../services/mails/sendMailService.js'; 
import { emailHtmltemplate } from '../services/mails/mailTemplates.js'; 
import { emailContent } from '../utils/validations/Validate.js';


export const sendEmailController = async (req, res,next) => {
    try{
    const { to, subject } = req.body;  
    if (!Array.isArray(to) || to.length === 0 || !subject) {
        return res.status(400).json({ message: 'Faltan datos requeridos: to y subject son obligatorios.' });
    }

    
    const html = emailHtmltemplate(); 

    
    const emailData = emailContent(to, subject, html); 

        const infoData = await sendMailService({ to, subject, html });
        return res.status(200).json({
            message: 'Correo enviado exitosamente',
            messageId: infoData.messageId });
    } catch (error) {
        next (error)
    }
}
