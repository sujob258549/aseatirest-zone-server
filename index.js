const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// const corsConfig = {
//     origin: ["http://localhost:5173", "https://asea-ture-zone-10.vercel.app"],
//     credentials: true,
// };

app.use(cors())
app.use(express.json());

// asea-turest-zones\
// DNVfwwgLOLbQi4cj
// Pa$$w0rd!


const uri = "mongodb+srv://asea-turest-zones\:DNVfwwgLOLbQi4cj@atlascluster.aasa6jh.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const torestzonescolection = client.db('torestzonesDB').collection('torestplase');


        app.post('/torestplase', async (req, res) => {
            const torest = req.body;
            const result = await torestzonescolection.insertOne(torest)
            res.send(result)
        })

        // all get
        app.get('/torestplase', async (req, res) => {
            const cursor = torestzonescolection.find();
            const result = await cursor.toArray();
            res.send(result)
        })
// single get
        app.get('/torestplase/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await torestzonescolection.findOne(query)
            res.send(result)
        });

// delete
        app.delete('/torestplase/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await torestzonescolection.deleteOne(query);
            res.send(result)

        })
        // update
        app.put('/torestplase/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            console.log(id, filter)
            const options = { upsert: true };
            const torestData = req.body;
            const updateDoc = {
                $set: {
                    name: torestData.name,
                    email: torestData.email,
                    Touristsspotname: torestData.Touristsspotname,
                    countryname: torestData.countryname,
                    location: torestData.location,
                    average_cost: torestData.average_cost,
                    seasonality: torestData.seasonality,
                    treveltime: torestData.treveltime,
                    totavisitorsperyear: torestData.totavisitorsperyear,
                    photourl: torestData.photourl,
                    textArea: torestData.textArea
                },
            };

            const result = await torestzonescolection.updateOne(filter, updateDoc, options);

        })


        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection

        app.post('/torestzones', (req, res) => {

        })
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})