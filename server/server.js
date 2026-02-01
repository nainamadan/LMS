// express server
import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./configs/mongodb.js"
import { clerkWebhooks } from "./controllers/webhooks.js"

// intilise express
const app=express()
// call fn to conect with db
await connectDB()
// add middleware
app.use(cors())
// default route
app.get('/',(req,resp)=>resp.send("api working"));
app.post('/clerk',express.json(),clerkWebhooks)
// port no

const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`)
})