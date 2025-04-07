const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 3006

const auth = require('./routes/auth')
const task = require('./routes/task')
const notFound = require('./middlewares/notFound')


app.use(cors())
app.use(express.json())
app.use('/api/auth', auth)
app.use('/api/task',task)
app.use(notFound)


const start = ()=>{
    try {
        const conn = mongoose.connect(process.env.MONGO_URI)
        console.log('DB Connected');
        
        app.listen(port,()=>{console.log(`Server is listening on localhost:${port}`);
        })
        
    } catch (error) {
        console.log(`Could not connected due to ${error}`);
        
    }
}

start()
