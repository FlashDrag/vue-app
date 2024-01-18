import express from "express";
import { MongoClient } from "mongodb";
import {
  cartItems as cartItemsRaw,
  products as productsRaw,
} from "./temp-data";
import dotenv from "dotenv";
dotenv.config();


let cartItems = cartItemsRaw;
let products = productsRaw;

const client = new MongoClient(process.env.MONGO_DB_URL);
const app = express();
app.use(express.json());

// endpoint for testing
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", async (req, res) => {
  try {
    await client.connect();
    // connect to the database "fsv-db"
    const db = client.db("fsv-db");
    // get the collection "products" and convert it to an array
    const products = await db.collection("products").find().toArray();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
});

function populateCartIds(ids) {
  return cartItems.map((id) => products.find((product) => product.id === id));
}

app.get("/cart", (req, res) => {
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
});

app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;
  const product = products.find((product) => product.id === productId);
  res.json(product);
});

app.post("/cart", (req, res) => {
  const productId = req.body.id;
  cartItems.push(productId);
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
});

app.delete("/cart/:productId", (req, res) => {
  const productId = req.params.productId;
  cartItems = cartItems.filter((id) => id !== productId);
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
