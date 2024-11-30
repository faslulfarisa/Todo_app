// models acess
const User=require("../models/user.model");
const Note=require("../models/note.model");
// token
const jwt = require("jsonwebtoken");
const { query } = require("express");

const createAccount = async(req,res) =>{
    const {fullName,email,password}=req.body;
    if(!fullName){
        return res.status(400).json({error:true,message:"Full Name is required"});
    }
    if(!email){
        return res.status(400).json({error:true,message:"Email is required"});
    }
    if(!password){
        return res.status(400).json({error:true,message:"Password is required"});
    }
    try{
        const existingUser = await User.findOne({email:email});
        // Check if the user already exists
        if (existingUser){
            return res.status(409).json({message:'User already exist'})
        }
        // Create a new User instance
        const user= new User({
            fullName,
            email,
            password
        });
        await user.save();
        // create token
        const payload={
            id:user._id.toString(),
            email:user.email
        }
        const token=jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET, {expiresIn: "36000m"});
        return res.status(201).json({
            error:false,
            user,
            token,
            message:"Registration Successful"
        });
    }catch(error){
        res.status(500).json({error:'An error ocurred while creating '});
    }
}
const createLogin = async(req,res) =>{
    const { email,password } = req.body;
    if(!email){
        return res.status(400).json({error:true,message:"Email is required"});
    }
    if(!password){
        return res.status(400).json({error:true,message:"Password is required"});
    }
    try{
        const existingUser = await User.findOne({ email });
        // // Check if the user already exists
        if (!existingUser){
            return res.status(400).json({message:'User not found'})
        }
        // Verify
        if(existingUser.email==email && existingUser.password==password){
            const user={user:existingUser};
            const token=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"36000m"})
            return res.status(200).json({
                error:false,
                email,
                token,
                message:"Login Successful"
            });
        }
        else{
            return res.status(400).json({
                error:true,
                message:'Invalid Credentials'
            })
        }
    }catch(error){
        res.status(500).json({error:'An error ocurred while creating '});
    }
}
const getUser = async(req,res) =>{
    console.log(req.user);
    const {user}=req.user;
    const isUser =await User.findOne({_id:user._id})
    if(!isUser){
        return res.status(401).json({message:"User not Found"})
    }
    return res.json({
        user:{
            "fullName":isUser.fullName,
            "email":isUser.email,
            "_id":isUser._id,
            "createdOn":isUser.createdOn
        },
        message:"User Found"
    })

}
const createNote =async(req,res) =>{
    console.log(req.user,"user")
    const {title,content,tags}=req.body;
    const userId = req.user.user._id;
    console.log('userid:', req.user.user._id);
    if(!title){
        return res.status(400).json({error:true,message:"Title is required"});
    }
    if(!content){
        return res.status(400).json({error:true,message:"Content is required"});
    }
    try{
        const newNote = await Note.create({
            title,
            content,
            tags:tags||[],
            userId
        });

        return res.status(201).json({
            error:false,
            newNote,
            message:"Note added successfully"
        });

    }catch(error){
        console.error('Error creating note:', error); 
        return res.status(500).json({
            error:true,
            message:'An error ocurred while creating '
        });
    }
}
const updateNote = async(req,res) =>{
    const noteId = req.params.noteId;
    const {title,content,tags,isPinned} = req.body;
    const {user}=req.user;
    console.log(req.body,"body");
    console.log( noteId,"noteId");
    console.log(user._id,"userId");
    if(!title && !content && !tags){
        return res.status(400).json({error:true,message:"No Changes Provided"})
    }
    try{
        const note = await Note.findOne({_id:noteId,userId:user._id});
        console.log(note,"note");
        if(!note){
            return res.status(404).json({error:true,message:"Note not found"})
        }
        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;

        await note.save();
        return res.json({
            error:"false",
            note,
            message:"Note updated successfully"
        });
    }catch(error){
        console.error('Error updating note:', error); 
        return res.status(500).json({
            error:true,
            message:"Internal Server Error",
        })
    }
}
const getAllNotes = async(req,res) =>{
    const {user}= req.user;
    console.log(req.user,"1");
    try{
        const notes = await Note.find({userId:user._id})
        return res.json({
            error:false,
            notes,
            message:"All notes retrieved successfully"
        });
    }catch(error){
        return res.status(500).json({
            error:true,
            message:"Internal Server Error"
        })
    }
}
const deleteNote = async(req,res) =>{
    const noteId = req.params.noteId;
    console.log(req.params.noteId,"noteid")
    const user = req.user.user;
    console.log(req.user.user,"user")
    try{
        const note = await Note.findOne({_id:noteId,userId:user._id});
        console.log(user._id,"userid");
        if(!note){
            return res.status(404).json({error:true,message:"Note not found"})
        }
        await Note.deleteOne({_id:noteId,userId:user._id});
        return res.json({
            error:false,
            message:"Note deleted successfully"
        });
    }catch(error){
        return res.status(500).json({
            error:true,
            message:"Internal Server Error",
        });
    }
}
const updateNotePinned = async(req,res) =>{
    const noteId=req.params.noteId;
    const {user}=req.user;
    console.log(req.user,"user");
    console.log(user,"userid");
    const {isPinned}=req.body;
    try{
        const note = await Note.findOne({_id:noteId,userId:user._id})
        if(!note){
            return res.status(404).json({error:true,message:"Note not Found"})
        }
        console.log(note.isPinned,"beforepinned");
        if(isPinned)note.isPinned=isPinned;
        console.log(note.isPinned,"afterpinned");
        await note.save();
        return res.json({
            error:false,
            note,
            message:"note updated successfully"
        })
    }catch(error){
        return res.status(500).json({
            error:true,
            message:"Internal Server Error"
        })
    }

}
const searchNote = async(req,res)=>{
    const {user} = req.user;
    const {query} =req.query;
    if(!query){
        return res.status(400).json({
            error:true,
            message:"Search query is required"
        });
    }
    try{
        const matchingNotes = await Note.find({
            userId:user._id,
            $or:[
                {title:{
                    $regex:new RegExp(query,"i")
                }},
                {content:{
                    $regex:new RegExp(query,"i")
                }},
            ],
        });
        return res.json({
            error:false,
            notes:matchingNotes,
            message:"Notes matching the search query retrieved successfully"
        });

    }catch(error){
        return res.status(500).json({
            error:true,
            message:"Internal Server Error"
        });
    }
}
module.exports = {
    createAccount,
    createLogin,
    getUser,
    createNote,
    updateNote,
    getAllNotes,
    deleteNote,
    updateNotePinned,
    searchNote
};