import { Webhook } from "svix";
import User from "../models/User.js"
import { success } from "zod";
                                      
// api controller fn to manage cler user with db
 export const clerkWebhooks=async(req,resp)=>{
try {
  // get sceret key
  const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)

  // verify
  await whook.verify(JSON.stringify(req.body),{
    "svix-id":req.headers["svix-id"],
    "svix-timestamp":req.headers["svix-timestamp"],
  "svix-signature":req.headers["svix-signature"]
  })
  const {data,type}=req.body
  // differnct cases user created dlted or any other case
  switch (type) {
    case 'user.created':
      {
        // create data to be stored in db
        const userData={
          _id:data.id,
          email:data.email_address[0].email_address,
          name:data.first_name+" "+data.last_name,
          imageUrl:data.image_url,
        }
        await User.create(userData)
        resp.json({})
        break;
      }
       case 'user.updated':{
          const userData={
          email:data.email_address[0].email_address,
          name:data.first_name+" "+data.last_name,
          imageUrl:data.image_url,
        }
        await User.findByIdAndUpdate(data.id,userData)
        resp.json({})
        break;
       }
       case 'user.deleted':
        {
          await User.findByIdAndDelete(data.id);
          resp.json({})
        break;
        }
  
    default:
      break;
  }
} catch (error) {
  resp.json({success:false,message:error.message})
}
}