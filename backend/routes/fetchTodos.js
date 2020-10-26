const router = require("express").Router();
const ObjectId = require("mongodb").ObjectID;
const User = require("../models/Users");
router.get("/user", (req, res) => {
  console.log(req.user);
  res.send(req.user);
});
router.post("/update", (req, res) => {
  // Code to update as the save button is pressed
  // User.updateOne({ _id: ObjectId(req.params.id) }, { $push: { pendingToDos: req.body.pendingToDos , completedToDos: req.body.completedToDos} }, (user) => {
  //     console.log(user.pendingToDos,user.completedToDos)
  // });
  User.findByIdAndUpdate(
    req.body.id,
    {
      pendingTodos: req.body.pendingTodos,
      completedTodos: req.body.completedTodos,
    },
    (err, user) => {
      if (err) console.log(err);
      else console.log(req.body.pendingTodos,req.body.completedTodos)
      // console.log(user.pendingToDos)
      res.send(['Updated',req.body.pendingTodos,req.body.completedTodos])
    }
  );
});

module.exports = router;
