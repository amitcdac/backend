const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin:"*"
}))

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/React_Backend',{
  useNewUrlParser:true,
  useUnifiedTopology:true
});

const post_route = require('./routes/postRoute')

app.use('/api',post_route)
app.listen(8000,()=>{
  console.log('server is running')
})