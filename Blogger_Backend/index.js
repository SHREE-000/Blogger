import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import db from './dbConnection.js';
import authRoute from './routes/authRoute.js';
import blogRoute from './routes/blogRoute';
import contactRoute from './routes/contactRoute';
import { config } from 'dotenv';
config();

const app = express();

// Middleware
app.use(express.json({limit: '50mb'}));      
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
app.use(morgan("dev"));

// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Register the routes
app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);
app.use("/api/contact", contactRoute);

// Start server
const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
