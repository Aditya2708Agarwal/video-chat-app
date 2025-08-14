import mongoose, { mongo } from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["direct", "group"],
            required: true,
        },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            }
        ],
        name: {
            type: String,
        },
        icon: {
            type: String,
        },
        admins: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    }, {timestamps: true}
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation
