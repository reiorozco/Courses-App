import http from "./httpService";

export function getTopics() {
  return http.get("/api/topics");
}
