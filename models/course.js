const { DataTypes } = require("sequelize");
const Joi = require("joi");

const CourseModel = (connection) => {
  return connection.define(
    "Course",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      tutor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};

// Validate
const validateCourse = (course) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    tutor: Joi.string().min(3).max(255).required(),
    topics: Joi.array(),
  });

  return schema.validate(course);
};

module.exports = { CourseModel, validateCourse };
