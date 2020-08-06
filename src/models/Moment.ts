import mongoose, { Schema } from "mongoose";

const momentSchema = new Schema({
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  analysis_type: {
    type: String,
    required: true
  },
  definition_id: {
    type: String,
    required: true
  },
});

const Moment = mongoose.model("Moment", momentSchema, "moments");

export default Moment;