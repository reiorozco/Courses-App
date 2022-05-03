const { DataTypes } = require("sequelize");
const Joi = require("joi");

const TopicModel = (connection) => {
  return connection.define(
    "Topic",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};

// Validate
const validateTopic = (topic) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
  });

  return schema.validate(topic);
};

module.exports = { TopicModel, validateTopic };
