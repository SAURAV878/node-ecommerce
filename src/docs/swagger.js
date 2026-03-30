import swaggerJSDoc from "swagger-jsdoc";


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mastery E-commerce API',
            version: '1.0.0',
            description: 'E-commerce REST API built with Node.js, Mysql and Redis'
        },
        servers: [
            {
                url: 'http://localhost:8000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/routes/*.js'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
