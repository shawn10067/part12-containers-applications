const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync, setAsync } = require("../redis/index");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  req.id = id;
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  if (req.todo) {
    return res.send(req.todo);
  }
  res.sendStatus(405);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  if (!req.id) {
    console.log(req.id);
    return res.send("This is cap"); // Implement this
  }

  const addVar = await getAsync("add");
  const add = (addVar && JSON.parse(addVar).added_todos) || 0;
  console.log(addVar, add);

  await setAsync(
    "add",
    JSON.stringify({
      added_todos: add + 1,
    })
  );

  await Todo.findByIdAndUpdate(req.id, req.body);
  res.sendStatus(201);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
