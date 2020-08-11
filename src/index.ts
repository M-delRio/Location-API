import mongoose from "mongoose";
import app from "./server";
const port = 3000;

const uri = "mongodb://127.0.0.1:27017/location_api";

// connect to MongoDB with Mongoose and start server
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose
  .connect(uri, options)
  .then(() => app.listen(port))
  .catch(error => {
    throw error
  })
  .then(() => console.log(`Listening on port ${port}!\n\nMongoDB connected`));

