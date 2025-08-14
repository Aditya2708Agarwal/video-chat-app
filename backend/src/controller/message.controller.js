import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";

export const getusersForSidebar = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("error in getUsersSidebar", error.message);
        res.status(500).json({error: "internal server error"});
        
    }
}

export const getMessages = async(req,res) => {
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find(
            {
                $or:[
                    {senderId: myId, conversationId: userToChatId},
                    {senderId: userToChatId, conversationId: myId}
                ]
            }
        )

        res.status(200).json(messages)
    } catch (error) {
        console.log("error to getMessages controller", error.message);
        res.status(500).json({error: "internal server error"});
    }
}


export const sendMessages = async(req,res) => {
    try {
        const {text, image} = req.body;
        const {id:conversationId} = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if(image){
            const uploadResponse = cloudinary.uploader.upload(image);
            imageUrl = (await uploadResponse).secure_url; //check this if any problem came
        }

        const newMessage = new Message({
            senderId,
            conversationId,
            text,
            image: imageUrl,
        })

        await newMessage.save();

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("error in send message controller", error.message);
        res.status(500).json({error: "internal server error"});
    }

}