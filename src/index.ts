import mongoose from "mongoose";
import app from "./server";
const port = process.env.PORT || 3000;
const uri = "mongodb://127.0.0.1:27017/location_api";

// Connect to MongoDB with Mongoose.
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose
  .connect(uri, options)
  .then(() => app.listen(port))
  .catch(error => {
    throw error
  })
  // .then(() => 


  // ) 
  .then(() => console.log(`Listening on port ${port}!\n\nMongoDB connected`));

// app.listen(port, () => {
//   console.log(`Listening on port ${port}!`);
// });
