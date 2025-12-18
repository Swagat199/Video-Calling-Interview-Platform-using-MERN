import express from 'express';
import { ENV } from './lib/env.js';
import path from 'path';
import cors from "cors";
import { inngest } from './lib/inngest.js';
import { serve } from 'inngest/express';
import { inngestFunctions as functions } from './lib/inngest.js';
import { connectDB } from './lib/db.js';


const app = express();

//middleware
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://video-calling-interview-platform-us-delta.vercel.app/"
  ],
  credentials: true
}));//credentials true allows browser to include cookies to be sent with requests


const __dirname = path.resolve();

app.use("/api/inngest",serve({client:inngest,functions}))

app.get('/hello', (req, res) => {
  res.status(200).json({ msg: 'Server is running 12456' });
});
app.get('/hii', (req, res) => {
  res.status(200).json({ msg: 'Server is running 12456 hii' });
});




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
 