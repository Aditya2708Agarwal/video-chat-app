import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async(req, res)=> {
    const {fullname, email, password} = req.body;
    
    try {
        if(!fullname || !email || !password){
            return res.status(400).json({message: "fill all the required Fields"});
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password must be atleast 6 characters"});
        }

        const user = await User.findOne({email});

        if(user) return res.status(400).json({message: 'emali already exists'});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname:fullname,
            email: email,
            password: hashedPassword
        }) 

        if(newUser){
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({mesage:"Account Successfully created",
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
            
        }else{
            res.status(400).json({message: 'Invalid user Data'});
        }
        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
};


export const login =(req, res)=> {
    req.send('login route');
};

 
export const logout =(req, res)=> {
    req.send('logout route');
};