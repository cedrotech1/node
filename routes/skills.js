
const express = require('express');
const route=express.Router();
// const body=require('body-parser');

const mysql=require("mysql");
// const route=express.Router();


const db=mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})
  
//all skills
  route.get('/', (req, res) => {
    const sql="select * from skills";
    db.query(sql,(err,result)=>{
        return res.json(result);
    })
   
  });

  //all skills
  route.get('/one/:id', (req, res) => {
    const id=req.params.id;
    const sql="select * from skills where id=?";
    db.query(sql,[id],(err,result)=>{
      if(result.length>0)
      {
        return res.json(result);
      }else{
        return res.json({message:'not found'});
      }
        
    })
   
  });
   //count skills
   route.get('/count', (req, res) => {
    const sql="select count(id) as total_skills from skills";
    db.query(sql,(err,result)=>{
        return res.json(result);
    })
   
  });

//   add skills
route.post('/add', (req, res) => {
    const name=req.body.name;
    const percent=req.body.percent;
    const sql="INSERT INTO `skills` (`id`, `name`, `percent`) VALUES (NULL, ?, ?)";
    // const sql2="select * from skills where id= ? ";
    db.query(sql,[name,percent],(err,result)=>{
      
            
                return res.json(result);
        
       
    })
   
  });

  //delete skills

  //   delete skills
route.delete('/delete/:id', (req, res) => {
    const id=req.params.id;
    const sql="delete from skills where id= ?";
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
  
    //   delete skills
route.put('/update/:id', (req, res) => {
    const id=req.params.id;
    const name=req.body.name;
    const percent=req.body.percent;
    const sql="UPDATE `skills` SET `name` = ?, `percent` = ? WHERE `skills`.`id` = ?";
    // const sql2="select * from skills where id= ? ";
    db.query(sql,[name,percent, id],(err,result)=>{
        if(result.affectedRows==1)
        {
                return res.json({message:"well updated"});   
        }else{
            return res.json({message:"not found"});
        }
       
    })
   
  });

module.exports=route