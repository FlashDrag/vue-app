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