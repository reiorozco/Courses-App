const router = require("express").Router();

const { Topic } = require("../models");

router.get("/", async (req, res) => {
  const topics = await Topic.findAll({
    order: [["id"]],
  });

  return res.send(topics);
});

module.exports = router;
