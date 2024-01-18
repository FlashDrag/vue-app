import express from "express";

const app = express();

// endpoint for testing
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
