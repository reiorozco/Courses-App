const { Topic } = require("../models");
const topics = require("../utils/topicsData");

const getTopics = async () => {
  try {
    for (const topic of topics) {
      await Topic.findOrCreate({
        where: {
          name: topic,
        },
      });
    }
  } catch (error) {
    console.error("Error in getTopics: ", error.message);
  }
};

module.exports = { getTopics };
