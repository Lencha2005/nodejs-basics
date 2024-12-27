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

  // app.get('/students', async (req, res) => {
  //   const students = await getAllStudents();

  //   res.status(200).json({
  //     data: students,
  //   });
  // });

  // app.get('/students/:studentId', async (req, res, next) => {
  //   const { studentId } = req.params;
  //   const student = await getStudentById(studentId);   
    
  //   // Відповідь, якщо контакт не знайдено
	// if (!student) {
	//   res.status(404).json({
	// 	  message: 'Student not found'
	//   });
	//   return;
	// }

	// // Відповідь, якщо контакт знайдено
  //   res.status(200).json({
  //     data: student,
  //   });
  // });

  // app.use('*', (req, res, next) => {
  //   res.status(404).json({
  //     message: 'Not found',
  //   });
  // });

  app.use('*', notFoundHandler);

  // app.use((err, req, res, next) => {
  //   res.status(500).json({
  //     message: 'Something went wrong',
  //     error: err.message,
  //   });
  // });

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};