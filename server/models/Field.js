import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fieldName: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  cropType: { type: String, required: true },
  areaSize: { type: Number, required: true }, 
}, { timestamps: true });

const Field = mongoose.model("Field", FieldSchema);

export default Field;
