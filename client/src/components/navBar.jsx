import React from "react";
import { Link as ReachLink, Outlet } from "react-router-dom";

import { Box, Link } from "@chakra-ui/react";

function NavBar() {
  return (
    <>
      <Box
        bg="blue.500"
        w="100%"
        p={4}
        color="white"
        fontWeight="bold"
        textAlign="left"
      >
        <Link as={ReachLink} to="/">
          Programming Courses
        </Link>
      </Box>

      <Outlet />
    </>
  );
}

export default NavBar;
