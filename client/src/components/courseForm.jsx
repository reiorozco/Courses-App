import React, { useState, useEffect } from "react";
import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Joi from "joi";

import { getTopics } from "../services/topicService";
import { getCourse, saveCourse } from "../services/courseService";
import { CloseIcon } from "@chakra-ui/icons";

function CourseForm() {
  const [topics, setTopics] = useState([]);
  const [course, setCourse] = useState({ title: "", tutor: "", topics: [] });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const populateCourse = async () => {
    try {
      const { id: courseId } = params;
      console.log(courseId);
      if (courseId === "new") return;

      const { data: course } = await getCourse(courseId);
      setCourse(course);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        navigate("/", { replace: true });
    }
  };

  const handleChange = ({ target: { value, name } }) => {
    let courseCopy = { ...course };

    if (name === "topics") {
      courseCopy[name].push(value);
      courseCopy[name] = [...new Set(courseCopy[name])];
    } else {
      courseCopy = { ...courseCopy, [name]: value };
    }

    setCourse(courseCopy);
  };

  const handleDelete = ({ target: { value } }) => {
    let copy = { ...course, topics: course.topics.filter((t) => t !== value) };

    setCourse(copy);
  };

  const schema = Joi.object({
    id: Joi.number(),
    title: Joi.string().min(3).max(255).required(),
    tutor: Joi.string().min(3).max(255).required(),
    topics: Joi.array().min(1),
  });

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = schema.validate(course, options);
    if (!error) return null;

    const errors = {};
    error.details.map(
      (item) => (errors[item.path[0]] = { message: item.message })
    );
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    setIsSubmitting(true);
    await saveCourse(course);

    console.log("Form Submitted");
    setIsSubmitting(false);
    navigate("/");
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await getTopics();

      setTopics(data);

      await populateCourse();
    }

    fetchData();
  }, []);

  return (
    <Center m={5} alignItems="baseline">
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={errors.title} m={2}>
          <FormLabel htmlFor="title">Title</FormLabel>

          <Input
            id="title"
            name="title"
            onChange={handleChange}
            value={course.title}
            placeholder="Title..."
          />

          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.tutor} m={2}>
          <FormLabel htmlFor="tutor">Tutor</FormLabel>

          <Input
            id="tutor"
            name="tutor"
            onChange={handleChange}
            value={course.tutor}
            placeholder="Tutor..."
          />

          <FormErrorMessage>
            {errors.tutor && errors.tutor.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.topics} m={2}>
          <FormLabel htmlFor="topics">Topics</FormLabel>

          <Select
            id="topics"
            name="topics"
            onChange={handleChange}
            placeholder="Select topics"
          >
            {topics.map((topic) => (
              <option key={topic.id} value={topic.name}>
                {topic.name}
              </option>
            ))}
          </Select>

          <FormErrorMessage>
            {errors.topics && errors.topics.message}
          </FormErrorMessage>
        </FormControl>

        <Center>
          <Button
            mt={4}
            colorScheme="blue"
            isLoading={isSubmitting}
            type="submit"
          >
            Save
          </Button>
        </Center>
      </form>

      <Container>
        <Text>Topics</Text>

        {course.topics.map((topic) => (
          <Button
            key={topic}
            m={1}
            value={topic}
            rightIcon={<CloseIcon />}
            colorScheme="blue"
            variant="outline"
            onClick={handleDelete}
            size="sm"
          >
            {topic}
          </Button>
        ))}
      </Container>
    </Center>
  );
}

export default CourseForm;
