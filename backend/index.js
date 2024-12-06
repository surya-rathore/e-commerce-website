const express =require("express");
const app=express();
const cors = require("cors");
require("dotenv").config();
require("./config/db");
const userRouter=require("./routers/userRouter");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    cors({
      origin: "http://localhost:3000", // Allow only this origin
      methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
      credentials: true, // Allow cookies or credentials to be sent
    })
  );
app.use("/user",userRouter);
app.listen(process.env.PORT,()=>{
    console.log(`server is running at port:${process.env.PORT}`);
})