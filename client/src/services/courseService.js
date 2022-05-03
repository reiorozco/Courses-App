import http from "./httpService";

export function getCourses() {
  return http.get("/api/courses");
}

export function getCourse(courseId) {
  return http.get(`/api/courses/${courseId}`);
}

export function saveCourse(course) {
  if (course.id) {
    const body = { ...course };
    delete body.id;
    return http.put(`/api/courses/${course.id}`, body);
  }

  return http.post("/api/courses", course);
}

export function deleteCourse(courseId) {
  return http.delete(`/api/courses/${courseId}`);
}
