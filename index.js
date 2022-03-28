const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/toDo");
};

//user schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//connect the schema to the user collection
const User = mongoose.model("user", userSchema);

//todo schema
const toDoschema = new mongoose.Schema(
  {
    todo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//connect the schema to todo collection
const Todo = mongoose.model("todo", toDoschema);

//api for register

app.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).send({ message: registered });
  } catch (err) {
    console.log("something wrong");
  }
});

app.listen(4000, async () => {
  await connect();
  console.log("listening on port 4000");
});
