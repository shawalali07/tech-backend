import express from 'express'; //ES Modules
const app = express();
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
// Body parser
app.use(express.json());

// Load env vars
import { config } from 'dotenv';
config({ path: './config/.env' });

// Db connectivity file
import connectDB from './config/db.js';
connectDB();
app.use(cors());
// Route files
import userRoute from './routes/userRoute.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  //it gives us the http methods and status
  app.use(morgan('dev'));
}

// Mount router
app.use('/api/users', userRoute);

//Custom Middleware
app.use(notFound);
app.use(errorHandler);

// Server connectivity
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
      .yellow.bold
  )
);
