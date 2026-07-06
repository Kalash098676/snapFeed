require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/posts", (req, res) => {
  res.json([
    {
      _id: "1",
      image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=620&q=80",
      caption: "Beautiful scenery",
    },
  ]);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});