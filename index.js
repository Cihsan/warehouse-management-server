const express=require('express')
const app=express()
const port =process.env.port || 5000
const cors = require('cors')
app.use(cors()) //
app.use(express.json()) //for parse
/* Declare Path */
require('dotenv').config()// for envirment variable
//goods-store
//4ucRwGPtCEh0zE02
app.get('/', (req, res) => {
  res.send('Welcome To Goods Store Server')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
