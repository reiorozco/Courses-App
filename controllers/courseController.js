const { Course, Topic } = require("../models");

const createCourse = async (title, tutor, topics) => {
  try {
    const courseCreated = await Course.create({
      title: title,
      tutor: tutor,
    });

    await Topic.findAll({
      where: {
        name: topics,
      },
    }).then((res) => courseCreated.addTopics(res));

    return await Course.findOne({
      where: { title: title },
      include: [
        {
          model: Topic,
          through: { attributes: [] },
        },
      ],
    });
  } catch (error) {
    console.error("Error in createCourse: ", error.message);
  }
};

const updateCourse = async (id, title, tutor, topics) => {
  try {
    await Course.update(
      {
        title: title,
        tutor: tutor,
      },
      {
        where: {
          id: id,
        },
      }
    );

    const courseUpdated = await Course.findByPk(id);

    await Topic.findAll({
      where: {
        name: topics,
      },
    }).then((res) => courseUpdated.setTopics(res));

    return courseUpdated;
  } catch (error) {
    console.error("Error in updateCourse: ", error.message);
  }
};

const deleteCourse = async (id) => {
  try {
    const courseDeleted = await Course.findByPk(id);

    await Course.destroy({
      where: {
        id: id,
      },
    });

    return courseDeleted;
  } catch (error) {
    console.error("Error in deleteCourse: ", error.message);
  }
};

module.exports = { createCourse, updateCourse, deleteCourse };
