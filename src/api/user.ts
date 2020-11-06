import request from "@/utils/request";

export async function queryCurrentUser() {
  return request(`/currentUser`);
}

export async function login(data: any) {
  return request("/users/login", {
    method: "post",
    data,
  });
}
  
export async function logout() {
  return request("/users/logout", {
    method: "post",
  });
}