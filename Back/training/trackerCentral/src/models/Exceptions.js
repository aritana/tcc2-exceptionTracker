import mongoose from "mongoose";

const exceptionSchema = new mongoose.Schema(
    {
        id: { type: String },
        service: { type: String, required: true },
        traceId: { type: String, required: true },
        exception: { type: String },
        causedBy: [{ type: String }],
        method: { type: String },
    },
    { versionKey: false }
)

const exceptions = mongoose.model("exceptions", exceptionSchema);
export default exceptions;


