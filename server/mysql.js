const mysql = require("mysql")

const conn  = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"kratin"
})

conn.connect((err)=>{
    if(err) throw err
    else console.log("db connected")
})
