import express from "express";
const app = express();
import data from "./data.js";

app.get("/api/users", (req, res) => {
  res.json(data);
});
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = data.find((item) => item.id === id);
  if (id > data.length) {
    res.send(`Not Found On this id: ${id}`).status(400);
    console.log(id);
  }
  res.json(user);
});
app.listen(8000, () => {
  console.log("server listen : 8000");
});
