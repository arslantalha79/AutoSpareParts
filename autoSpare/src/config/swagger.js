const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AutoSpareParts API',
            version: '1.0.0',
            description: 'Oto Yedek Parça Yönetim Sistemi API Dokümantasyonu',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local Development Server',
            },
        ],
    },
    // Swagger'ın endpoint'leri bulması için routes klasörünü gösteriyoruz
    apis: ['./src/routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };