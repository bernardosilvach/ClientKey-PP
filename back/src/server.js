const app = require('./app');
const port = app.get('port');

const swaggerUi =  require('swagger-ui-express')
const swaggerJsDoc =  require('swagger-jsdoc')

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API das Funções do ClientKey",
            version: "1.0.0",
            description: "API CRUD para gerenciar as funções",
        },
        servers: [{url:  "http://localhost:3000"}],
    },
    apis: [`${__dirname}/routes/*.js`], //caminho para as rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => console.log(`Run on port ${port}!`));