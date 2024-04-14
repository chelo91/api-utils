import SibApiV3Sdk from '@getbrevo/brevo';
import { brevoKey } from '../config/const.config.js';
import { resOk, resError } from '../helper/response.js';

const sendEmail = async (subject, body, to) => {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = brevoKey;
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    if (!subject || !body || !to) {
        throw new Error('Subject, body and to are required');
    }

    sendSmtpEmail.subject = `${subject}`;
    sendSmtpEmail.htmlContent = `<html><body>${body}</body></html>`;
    sendSmtpEmail.sender = { "name": "No Responder", "email": "no-reply@chelo.xyz" };
    sendSmtpEmail.to = [to];
    //sendSmtpEmail.cc = [{ "email": "example2@example2.com", "name": "Janice Doe" }];
    //sendSmtpEmail.bcc = [{ "name": "John Doe", "email": "example@example.com" }];
    //sendSmtpEmail.replyTo = { "email": "replyto@domain.com", "name": "John Doe" };

    await apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
        return data
    }, function (error) {
        throw error
    });
}

export {
    sendEmail
}