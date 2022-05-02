const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

const uri = "mongodb+srv://react-node-0203:8PeuE982lXgPp8vD@cluster0.lnkho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect()
        const goodsStore = client.db("goodsDB").collection("goods");
        //get
        app.get('/products', async(req,res)=>{
            const query={}
            const allProduct=goodsStore.find(query)
            const product=await allProduct.toArray()
            res.send(product)
        })
        app.get('/products/:id',async (req,res)=>{
            const id = req.params.id
            const query={_id:ObjectId(id)}
            const result= await goodsStore.findOne(query)
            res.send(result)
        })

        app.delete('/products/:id', async(req,res)=>{
            const id= req.params.id
            const query={_id:ObjectId(id)}
            const result=await goodsStore.deleteOne(query)
            res.send(result)
        })
        
        
    }
    finally{
        //await client.close()
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Welcome To Goods Store Server')
  })

app.listen(port, () => {
  console.log(`Show Here ${port}`)
})
