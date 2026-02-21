import User from "../models/user.model.js";
export const getCurrentUser=async(req,res)=>{
  try{
    const userId=req.userId;
    const user=await User.findById(userId)
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    res.status(200).json({message:"user found",user:user})
     
  }catch(err){
    return res.status(500).json({message:"Internal server error"})

  }
}