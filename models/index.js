const dbConnection = require("../startup/db");

const { CourseModel } = require("./course");
const { TopicModel } = require("./topic");

const Course = CourseModel(dbConnection);
const Topic = TopicModel(dbConnection);

// Associations
Course.belongsToMany(Topic, { through: "CourseTopics" });
Topic.belongsToMany(Course, { through: "CourseTopics" });

module.exports = {
  Course,
  Topic,
};
