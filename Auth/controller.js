const {encrypt, validatePassword} = require("./utils/encryption")
const User = require('./models/user');
const { generateJWT, setJwtCookie } = require('./utils/jwt');

async function register(req, res) {
  const {email, password} = req.body
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" })
  }

  try {
    const hashedPassword = await encrypt(password)
    const newUser = await new User({email: email, password: hashedPassword}).save();
    const token = generateJWT(newUser);
    setJwtCookie(res, token)
    res.status(200).json({
      message: "User successfully created",
      user: newUser,
    })
  } catch (error) {
    res.status(401).json({
      message: "User not successful created",
      error: error.mesage,
    })
  }
};

async function login(req, res) {
    try {
      const {email, password} = req.body
      if (!email || !password) {
        return res.status(400).json({
          message: "Email or Password not provided",
        })
      }
      const user = await User.findOne({ email: email }).exec()
      if (!user) {
        res.status(401).json({
          message: "Login not successful",
          error: "User not found Or not exist",
        })
    }

      const isCorrectPassword = await validatePassword(password, user.password)
  
      if(isCorrectPassword){
        const token = generateJWT(user);
        setJwtCookie(res, token)
        res.status(200).json({
        message: "Login successful",
        user,
      })
    }
    else{
        res.status(400).json({
            message: "Login not succesful",
          })
    }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
          })
    }
  };

module.exports = {
    register,
    login
  }
  