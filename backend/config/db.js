const mongoose=require("mongoose");

var URL=process.env.MONGO_URL;
mongoose.connect(URL)
.then(()=>console.log("mongodb connected"))
.catch(()=>console.error("mongodb connection error:", err));