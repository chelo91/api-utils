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

const corsEnv = process.env.CORS_ORIGIN || "http://localhost:3000";
const corsOrigin = corsEnv.split(',');

const mailSender = process.env.EMAIL_SENDER || "no-reply@chelo.xyz";

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
    brevoKey, mailSender, corsOrigin
}