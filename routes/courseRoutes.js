const router = require("express").Router();

const {
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const { Course, Topic } = require("../models");
const { validateCourse } = require("../models/course");
const validate = require("../middleware/validate");

router.get("/", async (req, res) => {
  // // Test Error Handler
  // throw new Error("Could not get the courses.");

  const courses = await Course.findAll({
    order: [["id"]],
    include: [
      {
        model: Topic,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });

  const coursesMap = courses.map((course) => {
    const json = course.toJSON();
    return {
      ...json,
      topics: json.topics.map((topic) => topic.name),
    };
  });

  return res.send(coursesMap);
});

router.get("/:id", async (req, res) => {
  const course = await Course.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Topic,
        through: { attributes: [] },
      },
    ],
  });

  if (!course) return res.status(404).send("This course wasn't found.'");

  const json = course.toJSON();
  json.topics = json.topics.map((topic) => topic.name);

  res.send(json);
});

router.post("/", validate(validateCourse), async (req, res) => {
  const { title, tutor, topics } = req.body;

  const course = await Course.findOne({
    where: {
      title: title,
    },
  });
  if (course) return res.status(400).send("Course already exist.");

  const courseCreated = await createCourse(title, tutor, topics);

  return res.send(courseCreated);
});

router.put("/:id", validate(validateCourse), async (req, res) => {
  const { id } = req.params;
  const { title, tutor, topics } = req.body;
  const courseUpdated = await updateCourse(id, title, tutor, topics);

  return res.send(courseUpdated);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const courseDeleted = await deleteCourse(id);

  return res.send(courseDeleted);
});

module.exports = router;
