import express from 'express';
import { ENV } from './lib/env.js';
import path from 'path';
import cors from "cors";
import { inngest } from './lib/inngest.js';
import { serve } from 'inngest/express';
import { inngestFunctions as functions } from './lib/inngest.js';
import { connectDB } from './lib/db.js';
import  {clerkMiddleware} from '@clerk/express'
import { protectRoute } from './middleware/protectRoute.js';
import chatRoutes from './routes/chatRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';


const app = express();
const __dirname = path.resolve();
//middleware
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://video-calling-interview-platform-us-delta.vercel.app/"
  ],
  credentials: true
}));//credentials true allows browser to include cookies to be sent with requests


app.use(clerkMiddleware({}));// This adds auth field to request object:req.auth()

app.use("/api/inngest",serve({client:inngest,functions}))

app.use("/api/chat",chatRoutes);
app.use("/api/sessions",sessionRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ msg: 'Server is running 12456' });
});

app.get('/videocalls', protectRoute, (req, res) => {
  res.status(200).json({ msg: 'This is a protected route' });
});//When user accesses this route, first protectRoute middleware will run to check authentication




if(ENV.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  app.get('/{*any}',(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend','dist','index.html'));
  });
}


const startServer = async () => { 
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`✅ Server is running on port ${ENV.PORT}`);
    });
}
  catch (error) {
    console.error('❌ Error  starting server', error);
  }
};

startServer();
console.log(ENV.PORT);
 