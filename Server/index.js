const express = require('express');
const connectDB = require('./db.js');
const router  = require('./routes.js')

const app = express();
const port = 4000;


connectDB();

app.use("/api",router)

app.get('/',(req,res)=>{
 res.send('Hello mittro')
 console.log('this is default Api')
})

app.listen(port,()=>{
 console.log("server is listen on port:",port)
})