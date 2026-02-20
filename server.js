const path = require("path");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const db = require("./index");
const app = express();
const PORT = process.env.PORT || 3000;

// CORSの設定（Reactアプリからのアクセスを許可）
app.use(
  cors({
    origin: "http://localhost:5173", // React側のURL
    credentials: true,
  }),
);

// セッションの設定
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: false,
    },
    // genid: function (req) {
    //   return "user-1234";
    // },
  }),
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.get("/api/recipes", async (req, res) => {
  const result = await db("recipe")
    .join("recipe_user", "recipe.user_id", "recipe_user.id")
    .select("*");
  res.send(result);
});

app.get("/api/recipes/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  const result = await db("recipe")
    .join("recipe_user", "recipe.user_id", "recipe_user.id")
    .select("*")
    .where("title", "like", `%${keyword}%`)
    .orWhere("description", "like", `%${keyword}%`)
    .orWhere("ingredients", "like", `%${keyword}%`)
    .orWhere("genre", "like", `%${keyword}%`);
  res.send(result);
});

app.get("/api/favorites/check", async (req, res) => {
  const { user_id, recipe_id } = req.query;
  const exists = await db("favorites").where({ user_id, recipe_id }).first();
  res.json({ isFavorite: !!exists });
});

app.post("/api/favorites", async (req, res) => {
  const { user_id, recipe_id } = req.body;
  await db("favorites").insert({ user_id, recipe_id });
  res.json({ success: true });
});

app.delete("/api/favorites", async (req, res) => {
  const { user_id, recipe_id } = req.body;
  await db("favorites").where({ user_id, recipe_id }).del();
  res.json({ success: true });
});

app.get("/api/mypages/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db("favorites")
    .join("recipe", "favorites.recipe_id", "recipe.id")
    .select("*")
    .where("favorites.user_id", id);
  res.send(result);
});

app.put("/api/favorites/memo", async (req, res) => {
  const { user_id, recipe_id, memo } = req.body;
  await db("favorites").update({ memo }).where({ user_id, recipe_id });
  res.json({ success: true });
});

// ログイン処理
app.post("/api/login", async (req, res) => {
  const id = req.body.userId;
  const user_password = req.body.password;
  const user = await db("recipe_user").where({ id, user_password }).first();
  if (user) {
    req.session.user = { id };
    return res.json({ message: "ログイン成功" });
  }
  res.status(401).json({ message: "認証失敗" });
});

// 認証チェック
app.get("/api/me", (req, res) => {
  if (req.session.user) {
    return res.json({ loggedIn: true, user: req.session.user });
  }
  res.status(401).json({ loggedIn: false });
});

// ログアウトの処理
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "ログアウトしました" });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
