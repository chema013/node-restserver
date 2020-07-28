/* Puerto */
process.env.PORT = process.env.PORT || 8080;

/* Entorno */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* Base de datos */
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

/* Vencimiento del token */
//60 segundos * 60 min * 24 horas * 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

/* SEED de autenticacion */
process.env.SEED = process.env.SEED || 'Desarrollo';

/* Google Client ID */
process.env.CLIENT_ID = process.env.CLIENT_ID || '504423777092-neehf657f9btjck05mdt6jng598oi913.apps.googleusercontent.com';