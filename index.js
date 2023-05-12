const express = require('express');
const app = express();
const cors = require('cors');
const conf=require('dotenv').config();

const jwt=require("jsonwebtoken");
app.use(express.json());



//routes
const userRoute=require("./routes/users");
const skillsRoute=require("./routes/skills");
const messageRoute=require("./routes/message");
const contentRoute=require("./routes/contents");
const adminRoute=require('./routes/admins')

const bodyParser =require("body-parser");
const cookieParser =require("cookie-parser");
const session =require("express-session");
//midle wares
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods:["GET","POST"],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
  key:"userID",
  secret:"mysecrete",
  resave:false,
  saveUninitialized:false,
  cookie:{
    expires:60*60*24,
  }
}))


app.use("/users",userRoute);
app.use("/skills",skillsRoute);
app.use("/message",messageRoute);
app.use("/content",contentRoute);
app.use("/admin",adminRoute);


// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
