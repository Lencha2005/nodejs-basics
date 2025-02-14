import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';

import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH, 'utf-8'));
    console.log('Swagger документ успішно завантажено');
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch {
    // console.error('Помилка завантаження Swagger документа:', error.message);
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};