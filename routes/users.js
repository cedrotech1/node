
const express = require('express');
const route=express.Router();
// const body=require('body-parser');

const mysql=require("mysql");
// const route=express.Router();
const bcrypt=require("bcrypt");
const saltround=10;


const db=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"myweb"
})
  
//all skills
  route.get('/', (req, res) => {
    const sql="select * from user";
    db.query(sql,(err,result)=>{
        return res.json(result);
    })
   
  });


  //   add users
route.post('/register', (req, res) => {
  const username=req.body.username;
  const password=req.body.password;

  bcrypt.hash(password,saltround,(err,hash)=>{

     const sql="INSERT INTO `user` (`id`, `username`, `password`) VALUES (NULL, ?, ?)";
  // const sql2="select * from skills where id= ? ";
  db.query(sql,[username,hash],(err,result)=>{
              return res.json(result); 
       })
  })

});

route.get('/login', (req, res) => {
 if(req.session.user)
 {
  res.send({isLoggedin:true,user:req.session.user})
 }
 else{
  res.send({isLoggedin:false,user:"not logened in"})
 }
});


//login
route.post('/login', (req, res) => {
  const {username,password}=req.body;
  // const password=req.body.password;
  const sql="select * from user where username=?";
  db.query(sql,[username],(err,result)=>{
    if(err)
    {
      return res.json(err.message);
    }
    else{
      if(result.length==1)
      {
              bcrypt.compare(password,result[0].password,(err,response)=>{
              if(response)
              {
                req.session.user=result;
                //console.log(req.session.user)
                res.send({username:result[0].username})
              }else{
                res.send({message:"password miss match"})
              }

           })
      }
      else{
          return res.json({message:"not found"});
      }
      
    }
      
  })
 
});


//   //all skills
//   route.get('/one/:id', (req, res) => {
//     const id=req.params.id;
//     const sql="select * from skills where id=?";
//     db.query(sql,[id],(err,result)=>{
//         return res.json(result);
//     })
   
//   });
//    //count skills
//    route.get('/count', (req, res) => {
//     const sql="select count(id) as total_skills from skills";
//     db.query(sql,(err,result)=>{
//         return res.json(result);
//     })
   
//   });

// //   add skills
// route.post('/add', (req, res) => {
//     const name=req.body.name;
//     const percent=req.body.percent;
//     const sql="INSERT INTO `skills` (`id`, `name`, `percent`) VALUES (NULL, ?, ?)";
//     // const sql2="select * from skills where id= ? ";
//     db.query(sql,[name,percent],(err,result)=>{
      
            
//                 return res.json(result);
        
       
//     })
   
//   });

//   //delete skills

//   //   delete skills
// route.delete('/delete/:id', (req, res) => {
//     const id=req.params.id;
//     const sql="delete from skills where id= ?";
//     // const sql2="select * from skills where id= ? ";
//     db.query(sql,[id],(err,result)=>{
//         if(result.affectedRows==1)
//         {
//                 return res.json({message:"well deleted"});   
//         }else{
//             return res.json({message:"not found"});
//         }
       
//     })
   
//   });
  
//     //   delete skills
// route.put('/update/:id', (req, res) => {
//     const id=req.params.id;
//     const name=req.body.name;
//     const percent=req.body.percent;
//     const sql="UPDATE `skills` SET `name` = ?, `percent` = ? WHERE `skills`.`id` = ?";
//     // const sql2="select * from skills where id= ? ";
//     db.query(sql,[name,percent, id],(err,result)=>{
//         if(result.affectedRows==1)
//         {
//                 return res.json({message:"well updated"});   
//         }else{
//             return res.json({message:"not found"});
//         }
       
//     })
   
//   });

module.exports=route



















// const express = require('express');
// const route=express.Router();
// // const body=require('body-parser');

// let users=[
//   {id: 1, name: "cedrick",age:23},
//   {id: 2, name: "patrick",age:76},
//   {id: 3, name: "erick",age:29},
// ]
// let ce=[];

// const mysql=require("mysql");
// // const route=express.Router();


// const db=mysql.createConnection({
//   host:"localhost",
//   user:"root",
//   password:"",
//   database:"myweb"
// })
  
//   // Define an endpoint at '/users'
//   route.get('/', (req, res) => {

   
//     // res.json(users);
//   });

//   route.get('/all', (req, res) => {
//     const sql="select * from skills";
//     db.query(sql,(err,result)=>{
//         return res.send(result);
//     })
   
//   });
  
//   route.get('/:id', (req, res) => {
//   const id=req.params.id

//   const user= users.find(u=>u.id===parseInt(id));

//   // ce.push(...user);
//   if(!user){
//     res.send("there is no such user")
//   }else{
//     res.json(user);
//   } 
//   });

//   route.post('/', (req, res) => {
//     if(!req.body.name || req.body.name.length<3)
//     {
//       res.send("name required and can be atleast 3 characters")
//       return;
//     }
//   const user={
//     id: users.length+1,
//     name:req.body.name
//   }
//   // console.log(req.body);
//   users.push(user);
    
//       res.json(users);
    
//     });

//     route.put("/edit/:id",(req,res)=>{
//       const id=req.params.id;
//       const user=users.find(u=>u.id===parseInt(id));

//       if(!user){
//         res.status(404).send("not found that id");
//       }

//       const newname=req.body.name;

//       if(!newname)
//       {
//         res.status(400).send("name is required");
//       }

//       user.name=newname;

//       res.send(users);

//     });

//     route.delete("/delete/:id",(req,res)=>{
//       const id=req.params.id;
//        users=users.filter(u=>u.id!==parseInt(id));

//       // if(!user){
//       //   res.status(404).send("not found that id");
//       // }

//       // const index=users.indexOf(user);

//       // users.splice(index,1); 

//       res.send(users);

//     })
 

// module.exports=route