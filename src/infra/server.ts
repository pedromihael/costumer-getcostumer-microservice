import 'reflect-metadata';
import 'regenerator-runtime/runtime.js';
import cors from 'cors';
import express from "express";
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { initializeLogs } from '../helpers/initializeLogs'
import routes from '../controllers/routes'
dotenv.config()

const PORT = process.env.PORT;
const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json());
app.use(routes)

initializeLogs(app);

app.listen(PORT, () => {
  console.log(`Get Costumer Service is running on port ${PORT}!`);
});