require('dotenv').config()
const express = require('express')
const cors = require('cors');
const connectDB = require('./db.js');
const { router } = require('./Routes/routes.js');
const { globalErrorhandler } = require('./middleware/errorHandler.js');


const app  = express();
connectDB();

app.use(cors());
app.use(express.json())
app.use("/api/v1",router);

app.get('/',(req,res)=>{
 res.send('API is Working')
 console.log("hello world");
 
})
app.use(globalErrorhandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
 console.log('server is running on PORT :',PORT);
 
})
