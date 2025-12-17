import express from 'express';
import { ENV } from './lib/env.js';
import path from 'path';
import cors from "cors";


const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://video-calling-interview-platform-us-delta.vercel.app/"
  ],
  credentials: true
}));


const __dirname = path.resolve();

app.get('/hello', (req, res) => {
  res.status(200).json({ msg: 'Server is running 12456' });
});
app.get('/hii', (req, res) => {
  res.status(200).json({ msg: 'Server is running 12456 hii' });
});

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});


if(ENV.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  app.get('/{*any}',(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend','dist','index.html'));
  });
}
console.log(ENV.PORT);
 