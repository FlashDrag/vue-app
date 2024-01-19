# Express backend server

## Setting up an Express server
- Initialize a new Node.js project
```bash
$ cd backend
$ npm init -y
```
- Create '.gitignore' file and add 'node_modules' to it
- Install Express library
```bash
$ npm install express
```
- Install Babel
```bash
$ npm install --save-dev @babel/core @babel/node @babel/preset-env @babel/cli @babel/plugin-transform-runtime @babel/runtime
```
- Create a new file called `.babelrc` and add the following code:
```json
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
}
```
- Create a new file called `src/server.js` (entrypoint for our app) and add the following code:
```javascript
import express from "express";

const app = express();

// endpoint for testing
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});

```
- Run the server
```bash
$ npx babel-node src/server.js
```
- Open a browser and go to `http://localhost:8000/hello` to test the server

## Setting up nodemon
Helps us to automatically restart the server when we make changes to the code
- Install nodemon
```bash
$ npm install --save-dev nodemon
```
- Add the following script to `package.json` to create a shortcut for running the server
```json
"scripts": {
  "dev": "nodemon --exec babel-node src/server.js"
}
```
- Run the server
```bash
$ npm run dev
```

## Setting up MongoDB on Ubuntu 22.04 LTS WSL
- Install MongoDB on WSL

  - https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-mongodb

- Installation guides for MongoDB on Ubuntu 22.04 LTS:
  - https://www.cherryservers.com/blog/install-mongodb-ubuntu-22-04
  - https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

- Enable systemd on WSL

https://learn.microsoft.com/en-us/windows/wsl/systemd#how-to-enable-systemd
```bash
$ nano /etc/wsl.conf
```
- Add the following lines to the file
```bash
[boot]
systemd=true
```
- Restart WSL in PowerShell
```bash
$ wsl --shutdown
```
- Start MongoDB service
```bash
$ sudo systemctl start mongod
```
- Check MongoDB service status
```bash
$ sudo systemctl status mongod
```
- To work with MongoDB use shell
```bash
$ mongosh
```
- To create a new database
```bash
> use fsv-db
# fsv-db is the name of the database. Use any name you want.
```

## Setting up MongoDB Atlas cloud database
- Create a free account on MongoDB Atlas
- Create a new project
- Create a new cluster:
  - M0 Free Tier
  - Provider: AWS
  - Region: eu-west-1 (Ireland)
  - Cluster name: cluster0
- Create a new database user
  - Username: any
  - Password: any
- Where would you like to connect from?
  - My Local Environment
- Add IP Access List Entry
  - Go to 'Network Access' tab
  - Click 'Add IP Address'
  - Click 'Allow Access from Anywhere'
- Connect to your cluster
  - Go to 'Clusters' tab
  - Click 'Connect'
  - Click 'Shell'
  - Select your mongo shell version (check with `mongosh` command)
  - Copy the connection string from the modal
  - Type password for the user you created for the cluster
  - You are now connected to your cluster

### Add data to MongoDB Atlas cloud database
- Create a new database called 'fsv-db' or any name you want
```bash
> use fsv-db
```
- Copy list of products from `backend/src/temp-data.js`
- Add the products data to the database
```bash
> db.products.insertMany([paste the list of products here])
# creates a new collection called 'products' and adds the data to it
```
- Add a new user to the database with cart items
```bash
> db.users.insertOne({ id: "1", cartItems: ["123", "345"] })
```
- Check if the data was added to the database
```bash
> db.products.find()
> db.users.find()
```

### Add MongoDB connection to the Express server
- Install MongoDB driver
```bash
$ cd backend
$ npm install mongodb
```
- Add mongoDB client to `src/server.js`
```javascript
import { MongoClient } from "mongodb";
```
- Add .env file to the root of the project with the following content:
```bash
# see the connection string in MongoDB Atlas "Connecting with MongoDB Driver"
MONGO_DB_URL=mongodb+srv://<username>:<password>@<cluster-url>.mongodb.net/?retryWrites=true&w=majorityw=majority
```
- Install dotenv library to read the .env file
```bash
$ npm install dotenv
```
- Add dotenv to `src/server.js`
```javascript
import dotenv from "dotenv";
dotenv.config();
```
- Add the following code to `src/server.js` to connect to the database
```javascript
const client = new MongoClient(process.env.MONGO_DB_URL);
```
- Connect to the database from the server. Inside each route, where we need to access the database, we need to add the following code:
```javascript
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
```

## Serving images from the server
- Put all images in `backend/assets` folder
- Add the following code to `src/server.js` to serve images from the server
```javascript
import path from "path";

app.use("/images", express.static(path.join(__dirname, "../assets")));
```







