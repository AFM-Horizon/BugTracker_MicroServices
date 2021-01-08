const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = require('./app');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bugtrace Bug Tracker A.P.I',
      version: '0.1.0',
      description:
        'This is an A.P.I designed for bugtracking.',
      license: {
        name: 'No Licence - Copyright 2019 - Bugtrace - Not For Public Use',
      },
      contact: {
        name: 'Bugtrace',
        url: 'https://bugtrace.com',
        email: 'speakerbugsound@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3002',
      },
    ],
  },
  apis: ['./routes/bug-routes.js', './routes/auth-routes.js', './routes/tag-routes.js'],
  components: {
    securitySchemes: {
      Bearer: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

const specs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.get('/api-json', (req, res) => {
  res.send(specs);
});

app.listen(3002, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3002');
});
