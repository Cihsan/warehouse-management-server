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

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://goods-store:4ucRwGPtCEh0zE02@cluster0.ug9mt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect()
        const goodsStore = client.db("goodsDB").collection("goods");
      
      
    }
    finally{
        //await client.close()
    }
}

run().catch(console.dir);


app.listen(port, () => {
  console.log(`Show Here ${port}`)
})
