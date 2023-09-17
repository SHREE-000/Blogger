import mongoose from "mongoose";
import { config } from "dotenv";
config();

const port = process.env.MONGO_URI

  mongoose.connect(port, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB database');
});

export default db;



