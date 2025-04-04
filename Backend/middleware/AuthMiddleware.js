import jwt from "jsonwebtoken"
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET

const AuthMiddleware= (req, res, next) => {
  try {
   
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded; 

    next(); 
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "Invalid token" });
  }
};
export default  AuthMiddleware
