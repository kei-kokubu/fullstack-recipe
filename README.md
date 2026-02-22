# fullstack-recipe

〜は料理レシピサービスです。レシピ・作り方を検索することができます。気に入ったレシピを保存いつでも見返すことができます。保存したレシピには自分でメモを追加することができます。

## 使用技術一覧

<img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
<img src="https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white">
<img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">
<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white">
<img src="https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white">

## セットアップ手順

### 1. バックエンドのセットアップ

1. **依存パッケージのインストール**

   プロジェクトルートディレクトリで下記コマンドを実行してください。

   ```sh
   npm install
   ```

2. **データベースの設定**

   .env ファイルの作成（USERやPASSWORDなど必要に応じて記述してください）

   ```sh
   cp .env.sample .env
   ```

3. **マイグレーションの実行（テーブル作成）**

   ```sh
   npm run db:migrate
   ```

4. **シードデータの投入（初期データの登録）**

   ```sh
   npm run db:seed
   ```

5. **バックエンドサーバの起動**

   ```sh
   npm run dev
   ```

---

### 2. フロントエンドのセットアップ

1. **`front` ディレクトリに移動**
   ```sh
   cd front
   ```
2. **依存パッケージのインストール**

   ```sh
   npm install
   ```

3. **フロントエンド開発サーバの起動**

   ```sh
   npm run dev
   ```

## ディレクトリ構成

```
.
├── README.md
├── front
│   ├── README.md
│   ├── dist
│   │   ├── assets
│   │   │   ├── index-COcDBgFa.css
│   │   │   ├── index-SguGrCfz.js
│   │   │   └── react-CHdo91hT.svg
│   │   ├── index.html
│   │   └── vite.svg
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── cake.jpg
│   │   ├── carbo.jpg
│   │   ├── don.webp
│   │   ├── ebi.avif
│   │   ├── gapao.jpeg
│   │   ├── gyoza.jpg
│   │   ├── hambarg.avif
│   │   ├── kura.webp
│   │   ├── mabo.jpg
│   │   ├── nikujaga.avif
│   │   ├── pepe.jpeg
│   │   ├── pizza.jpeg
│   │   ├── saba.avif
│   │   ├── sizer.jpg
│   │   ├── teri.jpg
│   │   ├── tonjiru.jpg
│   │   ├── tyahan.jpg
│   │   ├── vite.svg
│   │   ├── オム.jpeg
│   │   ├── ティラミス.jpeg
│   │   └── キーマカレー.jpeg
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── UserContext.jsx
│   │   │   ├── atoms
│   │   │   │   └── button
│   │   │   │       ├── LogoutButton.jsx
│   │   │   │       └── PrimaryButton.jsx
│   │   │   ├── molecules
│   │   │   │   ├── InputRecipe.jsx
│   │   │   │   ├── InputRecipeMemo.jsx
│   │   │   │   └── NumberOfHits.jsx
│   │   │   ├── organisms
│   │   │   │   ├── layout
│   │   │   │   │   └── Header.jsx
│   │   │   │   └── recipe
│   │   │   │       └── RecipeCard.jsx
│   │   │   ├── pages
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── MyPage.jsx
│   │   │   │   └── SearchResult.jsx
│   │   │   └── templetes
│   │   │       └── HeaderLayout.jsx
│   │   ├── hooks
│   │   │   └── useMessage.js
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── router
│   │   │   └── Router.jsx
│   │   └── theme
│   │       └── theme.js
│   └── vite.config.js
├── index.js
├── knexfile.js
├── migrations
│   ├── 20260217085619_create_recipeUser_table.js
│   ├── 20260217090225_create_recipe_table.js
│   └── 20260218070556_create_favorites_table.js
├── package-lock.json
├── package.json
├── public
├── seeds
│   ├── 001-recipeUser.js
│   ├── 002-recipe.js
│   └── 003-favorites.js
├── server.js
└── utils
└── fixture.js
```

## 将来の計画

- レシピ投稿機能の追加
- レシピ詳細ページの追加
