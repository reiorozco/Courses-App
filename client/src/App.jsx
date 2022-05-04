import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, Navigate } from "react-router-dom";

import NavBar from "./components/navBar";
import Courses from "./components/courses";
import CourseForm from "./components/courseForm";
import NotFound from "./components/notFound";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />

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
