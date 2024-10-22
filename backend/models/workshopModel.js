import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    agenda: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    hostedDate: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const Workshop = mongoose.model("Workshop", workshopSchema);
export default Workshop;
