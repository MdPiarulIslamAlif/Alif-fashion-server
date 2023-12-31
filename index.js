const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tcgprmi.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productCollection = client.db("alif-fashion").collection('product');
    const bookingCollection = client.db("alif-fashion").collection('bookings');


    //add product or insert product
    app.get("/api/v1/product",async(req, res)=>{
      const cursor = productCollection.find()
      const result = await cursor.toArray();
      res.send(result); 
    })


    //post method /create korar jonno post method kora hoi

    app.post("/api/v1/user/create-booking",async(req, res)=>{
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking)      
      res.send(result)
    });

    // delete method 
    app.delete("/api/v1/user/cancel-booking/:bookingId",async(req, res)=>{
      const id = req.params.bookingId
      const query = {_id: new ObjectId(id)}
      const result = await bookingCollection.deleteOne(query)
      res.send(result);
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
//     await client.close();
  }
}
run().catch(console.dir);






app.get('/',(req, res)=>{
     res.send('Alif Fashion is runing')
})

app.listen(port,()=>{
     console.log(`server tunning on port: ${port}`);

})

