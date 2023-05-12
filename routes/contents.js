
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
    const sql="select * from content";
    const sqlc="SELECT COUNT(id) as content FROM `content`"
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


  //   add content
  route.post('/addcontent', (req, res) => {
    const name=req.body.name;
    const phone=req.body.phone;
    const email=req.body.email;
    const web_title=req.body.web_title;
    const wellcame_massage=req.body.wellcame_massage;
    const about=req.body.about;

    const sql="INSERT INTO `content` (`id`, `name`, `phone`, `email`, `web_title`, `wellcame_massage`, `about`) VALUES (NULL, ?, ?, ?, ?, ?, ?)";
    const sql2="select * from content where id= ? ";
    const sqlc="select count(id) as total from content";

    db.query(sqlc,(err,result)=>{
        if(result){
            
                db.query(sql,[name,phone,email,web_title,wellcame_massage,about],(err,result)=>{
                    if(result.affectedRows==1)
                    {
                        db.query(sql2,[result.insertId],(err,result)=>{
                            return res.json(result);
                        })
                        
                    }
                
                })
        }else{
            return res.json();
        }

    });

});
    route.put('/:id', (req, res) => {
        const name=req.body.name;
        const phone=req.body.phone;
        const email=req.body.email;
        const web_title=req.body.web_title;
        const wellcame_massage=req.body.wellcame_massage;
        const about=req.body.about;
        //id
        const id=req.params.id;

        const sql="UPDATE `content` SET `name` = ?, `phone` = ?, `email` = ?, `web_title` = ?, `wellcame_massage` = ?, `about` = ? WHERE `content`.`id` = ?";
        // const sql2="select * from skills where id= ? ";
        db.query(sql,[name,phone,email,web_title,wellcame_massage,about, id],(err,result)=>{
            if(result.affectedRows==1)
            {
                    return res.json({message:"well updated"});   
            }else{
                   res.json({message:"not found"});
            }
           
        })
 
  });


  

     //count messages
     route.get('/count', (req, res) => {
        const sql="select count(id) as total_content from content";
        db.query(sql,(err,result)=>{
            return res.json(result);
        })
       
      });  

module.exports=route