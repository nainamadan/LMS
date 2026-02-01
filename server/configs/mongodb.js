// create fn to connect with db
import mongoose from "mongoose";
const connectDB=async()=>{
  // register event
  mongoose.connection.on('connected',()=>console.log("db connected"))
  // connect 
  await mongoose.connect(`${process.env.MONGODB_URI} /lms`)

}
// export fn
export default connectDB