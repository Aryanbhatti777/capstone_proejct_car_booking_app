import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const Login = async (req, res) => {

    try {
        
        const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message : "All fields are required"
        })
    }

    const user = await User.findOne({ email }).select("+password")
    console.log(user)

    if(!user){
        return res.status(404).json({
            message: "No user found"
        })
    }

    const matchedPassword = await bcrypt.compare( password, user.password);

    if(!matchedPassword){
        return res.status(400).json({
            message: "Email or password is wrong"
        })
    }

    return res.status (200).json({
        message: "Login successfull",
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      })

    } catch (error) {
        
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}
