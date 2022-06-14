import * as dotenv from "dotenv";
import { mongoose } from '@typegoose/typegoose'
dotenv.config();

const connectionURI = process.env.DB_CONN_STRING || ""

mongoose.connect(connectionURI)
  .then(() => console.log(`Successfully connected to database: ${process.env.DB_NAME} and collection: ${process.env.COLLECTION_NAME}`))
  .catch(err => console.log(err));
