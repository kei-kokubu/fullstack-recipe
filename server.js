const path = require("path");
const express = require("express");
const db = require("./index");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.get("/api/recipes", async (req, res) => {
  const result = await db("recipe").select("*");
  res.send(result);
});

app.get("/api/recipes/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  const result = await db("recipe")
    .select("*")
    .whereLike("title", `%${keyword}%`);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
