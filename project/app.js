import express from "express";
const app = express();
import fs from "fs";
import path from "path";
app.use(express.urlencoded({ extended: false })); //insert users into body
app.use(express.json());

const filePath = path.resolve("./project/users.json");

const readUsers = () => {
  const data = fs.readFileSync(filePath); //here is benefit to use readFileSync blocking method, we have to take data quick and have to use
  return JSON.parse(data);
};
const users = readUsers();

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/", (req, res) => {
  res.send("hello");
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((item) => item.id === id);
    if (id > users.length) {
      res.send(`Not Found On this id: ${id}`).status(400);
      console.log(id);
    }
    res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const updates = req.body;
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) return res.status(500).send("Error reading file");
      let user = users.find((u) => u.id === id);

      if (!user) return res.status(404).send("user not found");

      Object.assign(user, updates);

      fs.writeFile(filePath, JSON.stringify(users), (err) => {
        if (err) return res.status(500).send("Error writing file");
        res.send({ message: "User updated", user });
      });
    });
    res.send("patch");
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const updatedUsers = users.filter((item) => item.id !== id);
    fs.writeFile(filePath, JSON.stringify(updatedUsers), (err) => {
      res.send({ status: "pending", userRemove: true });
      // res.send(users);
    });
  });

app.post("/user", (req, res) => {
  const body = req.body;
  const newUser = { ...body, id: users.length + 1 };
  users.push(newUser);
  fs.writeFile(filePath, JSON.stringify(users), (err) => {
    res.send({ status: "pending" });
  });
  console.log(body);
});

app.listen(8000, () => {
  console.log("server listen : 8000");
});
