import dotenv from 'dotenv';
dotenv.config();

const persistence = process.env.PERSISTENCE || "MONGO";
const mongoDBName = process.env.MONGO_DB_NAME || "utils";
const port = process.env.PORT || 3000;
const url = process.env.URL || "http://localhost";
const mongoUrl = process.env.MONGO_URL || "";
const env = process.env.NODE_ENV || 'development';
const saltRounds = process.env.SALT_ROUNDS || 10;

const cloudflareUrl = process.env.CLOUDFLARE_URL;
const cloudflareKey = process.env.CLOUDFLARE_KEY;

const brevoKey = process.env.BREVO_KEY;
/*const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;*/

if (env === 'production') {
    // Configuraciones específicas para producción
    console.log('Estamos en modo producción.');
} else {
    // Configuraciones específicas para desarrollo
    console.log('Estamos en modo desarrollo.');
}
console.log(`Persistencia con ${persistence}`)

export {
    mongoDBName, port, url, mongoUrl, saltRounds,
    persistence, env, cloudflareUrl, cloudflareKey,
    brevoKey/*, smtpHost, smtpPort, smtpUser, smtpPass*/
}