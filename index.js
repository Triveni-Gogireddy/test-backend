import express from 'express';
import mysql from 'mysql' 
import cors from 'cors'
import { customerRouter } from './Routers/Customer.js';

const app = express ();
app.use(cors())
app.use("/",customerRouter)
app.use(express.json())
export const connection =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root1234',
    database:"practice1",

})

app.listen(3001,()=>console.log('server running on port 3001'))

const createUsertable = "CREATE TABLE IF NOT EXISTS users (id int AUTO_INCREMENT PRIMARY KEY,firstname VARCHAR(255),lastname VARCHAR(255),address VARCHAR(255),mobilenumber VARCHAR(255),email VARCHAR(255),password VARCHAR(255))"

const createPatienttable = "CREATE TABLE IF NOT EXISTS patients (id int AUTO_INCREMENT PRIMARY KEY,fullName VARCHAR(255),  age INT,gender VARCHAR(255),contact VARCHAR(255),address VARCHAR(255), email VARCHAR(255),medicalcondition VARCHAR(255))"

connection.connect((err)=>{
    if(err){
        console.log(err)
        return
    }else{
        console.log('connected to database succesfully')
        connection.query(createUsertable, (err) => {
            if (err) throw err;
            console.log(`${createUsertable} table created successfully!`);
          }); 
          connection.query(createPatienttable, (err) => {
            if (err) throw err;
            console.log(`${createPatienttable} table created successfully!`);
          }); 
           }
 })
// connection.connect((err)=>{
//     if(err){
//         console.log(err)
//         return
//     }else{
//         console.log('connected to database succesfully')
//         connection.query(createPatienttable, (err) => {
//             if (err) throw err;
//             console.log(`${createPatienttable} table created successfully!`);
//           });    }
// })



app.get("/",(req,res)=>{
    console.log('API is working succesfully')
    res.status(200).json({
        success: true,
        message: "API is working succesfully",
      });
    })
//cors for cross origin resource sharing
// status codes, cors, differnt methods and uses, express, 
//mysql,nodemon, package.json, npm,node.js,express.json(), listen, connect

app.post('/register',(req,res)=>{
      const {firstname,lastname,address,mobilenumber,email,password}=req.body
      console.log(req.body)
      try{
        connection.query("INSERT INTO users (firstname,lastname,address,mobilenumber,email,password) VALUES (?,?,?,?,?,?)",[firstname,lastname,address,mobilenumber,email,password],(err,result)=>{
            if(err){
                console.log(err)
                return
            }else{
                console.log('user registered succesfully')
                res.status(200).json({
                    success: true,
                    message: "user registered succesfully",
                  });
            }
        })
      }
      catch(err){
          console.log(err)

      }
})

// app.get('/users',(req,res)=>{
//     try{
//     connection.query("SELECT * FROM users",(err,result)=>{
//         if(err){
//             console.log(err)
//             return
//         }else{
//             res.send(result)
//         }

//     })
// }
// catch(err){
//     console.log(err)
// }
// })

// registration form for patient in hospital  
// table creation , post request (to insert the data), get request for display the data

app.post('/patientregistration',(req,res)=>{
    const {fullName,age,gender,contact,address,email,medicalCondition}=req.body
    console.log(req.body)
    try{
        connection.query("INSERT INTO patients (fullName,age,gender,contact,address,email,medicalcondition) VALUES (?,?,?,?,?,?,?)",[fullName,age,gender,contact,address,email,medicalCondition],(err,result)=>{
            if(err){
                console.log(err)
                return
            }else{
                console.log('patient registration succesfully')
                res.status(200).json({
                    success: true,
                    message: "patient registration succesfully",
                })
            }
        })
    }
    catch(err){
        console.log(err)
    }
})


app.get('/patientList',(req,res)=>{
    try{
    connection.query("SELECT * FROM patients",(err,result)=>{
        if(err){
            console.log(err)
            return
        }else{
            console.log(result)
            res.send(result)
        }

    })
}
catch(err){
    console.log(err)
}
})
app.get('/patient/:id',(req,res)=>{
    const id = req.params.id
    console.log(id)
    connection.query("SELECT * FROM patients WHERE id = ?",[id],(err,result)=>{
        if(err){
            console.log(err)
            return
        }else{
            console.log(result)
            res.send(result)
        }
    })

})
app.put('/patientsupdate/:id',(req,res)=>{
    const id = req.params.id
    console.log(id)
    connection.query("UPDATE patients SET ? WHERE id = ?",[req.body,id],(err,result)=>{
        if(err){
            console.log(err)
            return
        }else{
            console.log(result)
            res.send(result)
        }
    })
})

app.delete('/patientdelete/:id',(req,res)=>{
    const id = req.params.id
    console.log(id)
    connection.query("DELETE FROM patients WHERE id = ?",[id],(err,result)=>{
        if(err){
            console.log(err)
            return
        }else{
            console.log(result)
            res.send(result)
        }
    })
})


//                   practice purpose                        //

app.post('/patientregistration',(req,res)=>{
    const {fullName,age,gender,contact,address,email,medicalConditions}=req.body
    console.log(req.body)
    try{
        connection.query("INSERT INTO patients (fullName,age,gender,contact,address,email,medicalcondition) VALUES (?,?,?,?,?,?,?)",[fullName,age,gender,contact,address,email,medicalConditions],(err,result)=>{
            if(err){
                console.log(err)
                return
            }else{
                console.log('patient registration succesfully')
                res.status(200).json({
                    success:true,
                    message:'patient registration succesfully'
                })
            }
        })
    }
    catch(err){
        console.log(err)
    }
})

