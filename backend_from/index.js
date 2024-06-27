const mongoose=require('mongoose')
const express=require('express')
const app=express()
const cors=require('cors');
const customer=require('./routes/user')


mongoose.connect('mongodb://localhost/form')
.then(()=>console.log('connect those succesfully'))
.catch((err)=>console.log("failed to connect",err))
app.use(express.json())
app.use(cors())  
app.use('/api/form',customer)

// debug('Debug message: Application is starting...');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });