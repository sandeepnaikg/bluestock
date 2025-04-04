
import bcrypt from "bcryptjs";
import User from "../models/User.js"



import jwt from "jsonwebtoken"
import { sendEmail } from "../config/emailconfig.js";


// 📌 Signup Controller
export const signup = async (req, res) => {
  try {
    const {  email, full_name, password, staff_status } = req.body;

  
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({
    
      email,
      full_name,

      staff_status,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
// 📌 Login Controller

const sendEmailFun=async(to,subject,text,html)=>{
  const result =await sendEmail(to,subject,text,html);
  if(result.success){
      return true
  }else{
      return false
  }
}
export const forgetpassword=async (req,res) => {
  const {email}=req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 
    await user.update({
      otp: otp,
      otpexpires: expiresAt
  });

           const resp=sendEmailFun(email,"Verify Email", "", 
  `Dear User,<br><br>
  Your One-Time Password (OTP) for verification is: <b>${otp}</b><br><br>
  This OTP is valid for <b>5 minutes</b>. Please do not share this code with anyone.<br><br>
  If you did not request this, please ignore this email.<br><br>
  Best regards,<br>
  Bluestock`);
           res.status(200).json({msg:"the otp is sent on email"})
  } catch (error) {
    res.status(500).json({msg:"something went wrong"})
    console.log(error)
  }
  
}

export const verifyOTP=async (req,res) => {
  const {email,otp}=req.body
  try {
    const user = await User.findOne({ where: { email } });
    if(!user){
      res.status(404).json({msg:"User not found"})
    }

    if (!user || !user.otp || user.otpexpires < new Date() || user.otp !== otp) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP verified successfully" });
} catch (error) {
    console.error("Error in verify-otp:", error);
    res.status(500).json({ message: "Server error" });
}
}
export const resetpassword=async (req,res) => {
  const {email,password,confirmpassword}=req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found",success:false });
    }
    if(password!==confirmpassword){
      return res.status(402).json({msg:"Confirm password is not match",success:false})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });

  } catch (error) {
    console.log(error)
  }

  
}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true, secure: true });
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// 📌 Logout Controller
export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};
export const changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.id; // User ID from JWT token
  
      // Find user
      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // Check if old password is correct
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.json({ message: "Password changed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  



