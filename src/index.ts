/* eslint-disable @typescript-eslint/no-explicit-any */
// import { convertToSwaggerJson } from '@bakku/document';
import { convertToSwaggerJson, routeAppError, startServer, TypeServerOptions } from '@bakku/platform';
import swaggerUi from 'swagger-ui-express';
import { initialization } from './app';
import './routes';

(async () => {
  await initialization();
  const options: TypeServerOptions = {
    apiPrefix: 'api',
    logger: global.applicationContexts.logger,

    documentOptions: {
      docPath: 'doc',
    },
  };
  const { app, apiData } = startServer(options);

  const swaggerJson = convertToSwaggerJson(apiData);
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson));

  routeAppError(app, options);
})().catch((error) => {
  const { logger } = global.applicationContexts || {};
  (logger ? logger : console).error('server error ========', error);
  // stopServer(server);
});
