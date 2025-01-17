import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
// import dotenv from "dotenv";
import { getEnvVar } from './utils/getEnvVar.js';
// import studentsRouter from './routers/students.js'; // Імпортуємо роутер
import router from './routers/index.js';
// / Імпортуємо middleware
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

// dotenv.config();

// Читаємо змінну оточення PORT
// const PORT = Number(process.env.PORT);
const PORT = Number(getEnvVar('PORT', '3000'));


export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use(router); // Додаємо роутер до app як middleware

  app.use('*', notFoundHandler);


  app.use(errorHandler);

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};