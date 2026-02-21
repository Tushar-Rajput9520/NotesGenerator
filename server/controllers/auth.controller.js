import User from "../models/user.model.js"
import { getToken } from "../utils/token.js";

export const googleAuth=async(req,res)=>{
  try{
    const {name,email}=req.body;
    let user=await User.findOne({email})
    if(!user){
      user=await User.create({name,email})
    }
    const token=await getToken(user._id)
 res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});
    return res.status(200).json({message:"Authentication successful",user})
  }catch(err){
    return res.status(500).json({message:`googleSignUp Erroe {err}`})
  }
}

export const logOut=async(req,res)=>{
  try{
    await res.clearCookie("token")
    return res.status(200).json({message:"Logout successful"})

  }catch(err){
    return res.status(500).json({message:`Logout error ${err}`})
  }
}
