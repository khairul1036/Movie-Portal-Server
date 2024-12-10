const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ah9aw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(process.env.DB_USER, "||||" ,process.env.DB_PASS);
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
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db("movie-portal");
    const movieCollection = database.collection("movie");
    const favoriteCollection = database.collection("favorites");
    const userCollection = client.db("movie-portal").collection("users");

    // add movies api
    app.post("/movies", async (req, res) => {
      const newMovie = req.body;
    //   console.log("Create newMovie: ", newMovie);
      const result = await movieCollection.insertOne(newMovie);
      res.send(result);
    });

    // add favorites movies api
    app.post("/movies/favorites", async (req, res) => {
      const favoriteMovie = req.body;
    //   console.log("Create favoriteMovie: ", favoriteMovie);
      const result = await favoriteCollection.insertOne(favoriteMovie);
      res.send(result);
    });

    // get favorites api
    app.get("/movies/favorites", async (req, res) => {
      const cursor = favoriteCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // delete favorite movie
    app.delete("/movies/favorites/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: id };
      const result = await favoriteCollection.deleteOne(query);
      res.send(result);
    //   console.log(result);
    });

    // get movie api
    app.get("/movies", async (req, res) => {
      const cursor = movieCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // get one movie
    app.get("/movie/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await movieCollection.findOne(query);
      res.send(result);
    });

    // delete movie
    app.delete("/movie/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await movieCollection.deleteOne(query);
      res.send(result);
    });

    // create users related apis
    app.post("/users", async (req, res) => {
      const newUser = req.body;
    //   console.log("Create newUser: ", newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    // update login users api
    app.patch("/users", async (req, res) => {
      const email = req.body.email;
      const filter = { email };
      const updatedDoc = {
        $set: {
          lastSignInTime: req.body?.lastSignInTime,
        },
      };
      const result = await userCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // get top 6 movies
    app.get("/highest-rated", async (req, res) => {
      const movies = await movieCollection
        .find() // Fetch all movies
        .sort({ rating: -1 }) // Sort by rating in descending order
        .limit(6) // Limit to top 6
        .toArray();

      res.send(movies); // Send the list of movies as a JSON response
    });

    // get movie api
    app.get("/movies", async (req, res) => {
      const cursor = movieCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // PUT route to update movie details
    app.put("/movies/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedMovie = req.body;
      const movie = {
        $set: {
          poster: updatedMovie.poster,
          title: updatedMovie.title,
          genre: updatedMovie.genre,
          duration: updatedMovie.duration,
          releaseYear: updatedMovie.releaseYear,
          rating: updatedMovie.rating,
          summary: updatedMovie.summary,
        },
      };
      const result = await movieCollection.updateOne(filter, movie, options);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Movie Portal server is running");
});

app.listen(port, () => {
  console.log(`Movie Portal server is running on port: ${port}`);
});
