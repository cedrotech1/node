const express=require("express");
const jwt=require("jsonwebtoken");

const route=express.Router();
const mysql=require('mysql');
const bcrypt=require("bcrypt");
require('dotenv').config();





const db=mysql.createConnection({
    // host:"localhost",
    // user:"root",
    // password:"",
    // database:"myweb"
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
  })

  

  route.post("/add",(req,res)=>{
    const {username,password}=req.body;
    bcrypt.hash(password,10,(err,hash)=>{
        const q="INSERT INTO `admin` (`id`, `username`, `password`) VALUES (NULL, ?, ?)";
    db.query(q,[username,hash],(err,response)=>{
        res.send(response);
    }) 
    })

   


});


route.get("/",(req,res)=>{
 
        res.send("testing");

});
// route.get("/",(req,res)=>{
//     const q="select * from admin";
//     db.query(q,(err,response)=>{
//         res.send(response);
//     })
// });

route.get("/login",(req,res)=>{

    if(req.session.admin)
    {
        res.send({isLogin:true,user:req.session.admin})
    }
    else{
        res.send({isLogin:false,user:"not yet"})
    }
});

const verify=(req,res,next)=>{
    const token=req.headers["authorization"].split(" ")[1];
// console.log(req.headers)
    if(!token)
    {
        res.send("we need token men!!")

    }else{
         jwt.verify(token,"secrate",(err,decoded)=>{
            if(err)
            {
                res.send({auto:false,message:"u fail to autonticate"})   
            }else{
                req.userid=decoded.id;
                // console.log(decoded.id);
                 
                next();
            }
        })
    }
}
// Cedro1232@


route.get("/verify",verify,(req,res)=>{
        res.send({message:"yo lah"});
});


// route.get("/logout",(req,res)=>{
//    req.session.admin=[];
//    res.send("well logined out");
   
// });




route.post("/login",(req,res)=>{
    const {username,password}=req.body;
    const q="select * from admin where username=?";
    db.query(q,[username],(err,result)=>{
        if(err)
        {
            res.send(err.message)
        }
        if(result.length==1)
        {
            bcrypt.compare(password,result[0].password,(err,response)=>{
                if(response)
                {

                    const id=result[0].id;

                    const token=jwt.sign({id},"secrate",{expiresIn:60 })
                        
                   
                    
                    req.session.admin=result;
                   
                    console.log(req.session.admin)
                     res.send({auto:true,user:result,token:token});
                }
                else
                {
                    res.send({message:"password missmatch"});  
                }

            })


            
            
            //res.send(result[0].username);
           
        }
        else{
            res.send("user does not exist");
        }
        
    })
});

route.delete("/delete/:id",(req,res)=>{
    const id=req.params.id;
    const q="delete from admin where id=?";
    db.query(q,[id],(err,response)=>{
        res.send(response);
    })
});


module.exports=route