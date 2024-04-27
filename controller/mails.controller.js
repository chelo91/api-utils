import { sendEmail } from '../facade/brevo-api.js';
import { resOk, resError } from '../helper/response.js';
import { MailsService } from '../services/index.js';
import { mailSender } from '../config/const.config.js';
export const sendMail = async (req, res) => {
    try {
        const { subject, body, to, user } = req.app.locals;
        await sendEmail(subject, body, to);
        await MailsService.create({ subject, body, to, sender: mailSender, user: user._id });
        resOk(res, 'Email sent');
    } catch (error) {
        resError(res, error.message);
    }
}