import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Link,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { deleteCourse, getCourses } from "../services/courseService";
import { Link as ReachLink } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const headers = ["Title", "Tutor", ""];

  useEffect(() => {
    async function fetchData() {
      const { data } = await getCourses();

      setCourses(data);
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const originalCourses = courses;
    const filterCourse = originalCourses.filter((b) => b.id !== id);
    setCourses(filterCourse);

    try {
      await deleteCourse(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        console.log("This course has already been deleted.");

      setCourses(originalCourses);
    }
  };

  if (courses.length === 0)
    return (
      <Box m={2}>
        <Link
          as={ReachLink}
          sx={{ textDecoration: "none !important" }}
          to={`/courses/new`}
        >
          <Button mb={4} colorScheme="blue">
            Create Course
          </Button>
        </Link>

        <Heading w="75%">
          It looks like there are no courses for now, please create a course.
        </Heading>
      </Box>
    );

  return (
    <Box m={2} w="75%">
      <Link
        as={ReachLink}
        sx={{ textDecoration: "none !important" }}
        to={`/courses/new`}
      >
        <Button mb={4} colorScheme="blue">
          Create Course
        </Button>
      </Link>

      <TableContainer>
        <Table variant="simple">
          <TableCaption>Courses about programming</TableCaption>

          <Thead>
            <Tr>
              {headers.map((head) => (
                <Th key={head}>{head}</Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {courses?.map((course) => (
              <Tr key={course.id}>
                <Td>
                  <Link as={ReachLink} to={`/courses/${course.id}`}>
                    {course.title}
                  </Link>
                </Td>

                <Td>{course.tutor}</Td>

                <Td>
                  <DeleteIcon
                    cursor="pointer"
                    color="red.500"
                    w={6}
                    h={6}
                    onClick={() => handleDelete(course.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Courses;
