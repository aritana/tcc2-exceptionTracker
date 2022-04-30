import mongoose from "mongoose";

const methodSchema = new mongoose.Schema(
    {
        id: { type: String },
        method: { type: String, required: true },
    },
    { versionKey: false }
)

const method = mongoose.model("method", methodSchema);
export default method;