import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  type: {
    type: String,
    required: true
  },
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
  mode: {
    type: String,
    required: false
  },
  distance: {
    type: Number,
    required: false
  },
  waypoints: {
    type: Array,
    required: false
  },
  trajectory: {
    type: String,
    required: false
  },
  latitude: {
    type: Number,
    required: false
  },
  longitude: {
    type: Number,
    required: false
  },
  location: {
    type: Object,
    required: false
  }
});

const Event = mongoose.model("Event", eventSchema, "events");

export default Event;