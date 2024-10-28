import mongoose from 'mongoose'
import { config } from 'dotenv';
config()

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`)
    console.log('success connect to mongoDB ...');
  } catch (error: any) {
    console.log(`failed connect to mongoDB! : ${error.message}`);
  }
}

export default mongoDBConnection