const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express=require('express')
const cors = require('cors') //support diffrent port
require('dotenv').config()// for envirment variable
const port = process.env.PORT || 5000
const app = express()

app.use(cors()) //
app.use(express.json()) //for parse

/* Declare Path */
//goods-store
//4ucRwGPtCEh0zE02

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lnkho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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

        app.post('/products', async(req,res)=>{
            const newPD=req.body
            console.log('Adding New User',newPD);
            const result = await goodsStore.insertOne(newPD)
            res.send(result)
        })

        app.put('/products/minus/:id',async (req,res)=>{
            const id = req.params.id
            console.log(id);
            const minus=req.body
            const filter={_id:ObjectId(id)}
           const options={upsert:true}
           const updateDoc={
               $set:{
                   minus,
               }
           }
           const result= await minus.replaceOne(filter,updateDoc,options)
            res.send(result)
        })
        app.put('/products/plus/:id',async (req,res)=>{
            const id = req.params.id
            const newQt=req.body
            const filter={_id:ObjectId(id)}
           const options={upsert:true}
           const updateDoc={
               $set:{
                   qt:goodsStore.qt,
               }
           }
           const result= await newQt.findOneAndReplace(filter,updateDoc,options)
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
