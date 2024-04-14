import { sendEmail } from '../facade/brevo-api.js';
import { resOk, resError } from '../helper/response.js';

export const sendMail = async (req, res) => {
    try {
        const { subject, body, to } = req.body;
        await sendEmail(subject, body, to);
        resOk(res, 'Email sent');
    } catch (error) {
        resError(res, error.message);
    }
}