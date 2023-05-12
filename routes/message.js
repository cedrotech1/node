
const express = require('express');
const route=express.Router();
// const body=require('body-parser');

const mysql=require("mysql");
// const route=express.Router();


const db=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"myweb"
})
  
//all messages
route.get('/', (req, res) => {
    const sql="select * from message";
    const sqlc="SELECT COUNT(id) as messages FROM `message`"
    db.query(sqlc,(err,result)=>{
        if(result.message==0)
        {
            return res.json(result); 
        }
        else{
            
    db.query(sql,(err,result)=>{
        return res.json(result);
    })

        }
       
    })
   
  });


  //   add message
route.post('/addmessage', (req, res) => {
    const email=req.body.email;
    const message=req.body.message;
    const sql="INSERT INTO `message` (`id`, `email`, `message`) VALUES (NULL, ?, ?)";
    const sql2="select * from message where id= ? ";
    db.query(sql,[email,message],(err,result)=>{
        if(result.affectedRows==1)
        {
            db.query(sql2,[result.insertId],(err,result)=>{
                return res.json(result);
            })
             
        }
       
    })
   
  });

  //delete
  route.delete('/delete/:id', (req, res) => {
    const id=req.params.id;
    const sql="delete from message where id= ?";
    // const sql2="select * from skills where id= ? ";
    db.query(sql,[id],(err,result)=>{
        if(result.affectedRows==1)
        {
                return res.json({message:"well deleted"});   
        }else{
            return res.json({message:"not found"});
        }
       
    })
   
  });

     //count messages
     route.get('/count', (req, res) => {
        const sql="select count(id) as total_message from message";
        db.query(sql,(err,result)=>{
            return res.json(result);
        })
       
      });  

module.exports=route