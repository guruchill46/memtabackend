//////server/index.js
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import PostRoutes from './routes/roposts.js';
import UserRoutes from './routes/rouser.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json({limit:'30mb', extended: true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended: true}));
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
app.use(cors());

app.use('/posts', PostRoutes)
app.use('/user', UserRoutes)
app.get('/', function(req,res){
    res.send('server is working')
})

const CONNECTION_URL = process.env.CONNECTION_URL

const PORT = process.env.PORT||5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(
    ()=>app.listen(PORT, ()=>console.log(`server is running on : ${PORT}`)
)).catch((error)=>console.log(error))