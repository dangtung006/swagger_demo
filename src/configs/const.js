
const uploadPath = '../../public/uploads';
const privateKey = 'demo_private_key';
const publicKey  = 'demo_public_key';

const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'claim_api'
}

module.exports = {
    dbConfig,
    uploadPath,
    privateKey,
    publicKey
}