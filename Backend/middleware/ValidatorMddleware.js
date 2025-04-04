import { body,validationResult } from "express-validator";


export const validateSignup = [

  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); 
  },
];
 export const passwordValidator = (req, res, next) => {
  const { password } = req.body;

 
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!password || !strongPasswordRegex.test(password)) {
      return res.status(400).json({
          message: "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.",
      });
  }
  next(); 
};
export const changepasswordValidator = (req, res, next) => {
  const { newPassword } = req.body;

 
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!newPassword || !strongPasswordRegex.test(newPassword)) {
      return res.status(400).json({
          message: "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.",
      });
  }
  next(); 
};
export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
export const validateChangePassword = [
  // Old Password is required
  body("oldPassword")
    .notEmpty()
    .withMessage("Old password is required"),

  // New Password is required and must be at least 6 characters
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters"),

  // Ensure new password is different from the old one
  body("newPassword").custom((value, { req }) => {
    if (value === req.body.oldPassword) {
      throw new Error("New password must be different from the old password");
    }
    return true;
  }),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];




