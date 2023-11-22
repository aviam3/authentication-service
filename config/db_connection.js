const Mongoose = require("mongoose")
const MONGO_URL = `mongodb://localhost:27017/users`

const connectDB = async () => {
  try{
   await Mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("MongoDB Connected")
  }catch(error){
    console.log(error)
  }

}
module.exports = connectDB