import express from "express";
import { MongoClient } from "mongodb";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

async function start() {
  const client = new MongoClient(process.env.MONGO_DB_URL);

  // connect to the database "fsv-db"
  await client.connect();
  const db = client.db("fsv-db");

  const app = express();
  app.use(express.json());

  app.use("/images", express.static(path.join(__dirname, "../assets")));


  // endpoint for testing
  app.get("/api/hello", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/api/products", async (req, res) => {
    try {
      // get the collection "products" and convert it to an array
      const products = await db.collection("products").find().toArray();
      res.json(products);
    } catch (error) {
      console.log(error);
    }
  });

  async function populateCartIds(ids) {
    return Promise.all(
      ids.map((id) => db.collection("products").findOne({ id }))
    );
  }

  app.get("/api/users/:userId/cart", async (req, res) => {
    const user = await db
      .collection("users")
      .findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user.cartItems);
    res.json(populatedCart);
  });

  app.get("/api/products/:productId", async (req, res) => {
    const product = await db
      .collection("products")
      .findOne({ id: req.params.productId });
    res.json(product);
  });

  app.post("/api/users/:userId/cart", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.id;

    await db.collection("users").updateOne(
      { id: userId },
      {
        // push productId onto the user's cartItems property without dublicates
        $addToSet: { cartItems: productId },
      }
    );

    const user = await db
      .collection("users")
      .findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user.cartItems);
    res.json(populatedCart);
  });

  app.delete("/api/users/:userId/cart/:productId", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    await db.collection("users").updateOne(
      { id: userId },
      {
        $pull: { cartItems: productId },
      }
    );

    const user = await db
      .collection("users")
      .findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user.cartItems);
    res.json(populatedCart);
  });

  app.listen(3000, () => {
    console.log("Server is running on port: 3000");
  });
}

start();
