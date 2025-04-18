import express from 'express'
import { userRoutes } from './router/user.router.js';
import { expenseRouter } from './router/expense.router.js';
import jwt from 'jsonwebtoken'
import { refreshRefreshToken } from './controller/user.controller.js';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config({
    path:'./env'
})
const app = express();

app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send("hello world");
});
app.use('/v1/user',userRoutes)
app.use('/v1/expense',expenseRouter)
app.post('/v1/refresh',refreshRefreshToken);


app.listen(8080,()=>{
    console.log("port listing on host:8080");
})

