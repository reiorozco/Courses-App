import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import NavBar from "./components/navBar";
import Courses from "./components/courses";
import CourseForm from "./components/courseForm";
import NotFound from "./components/notFound";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate to="/courses" />} />

        <Route path="courses" element={<NavBar />}>
          <Route index element={<Courses />} />

          <Route path=":id" element={<CourseForm />} />

          <Route path="not-found" element={<NotFound />} />
        </Route>

        <Route path="*" element={<Navigate to="/courses/not-found" />} />
      </Routes>
    </div>
  );
}

export default App;
