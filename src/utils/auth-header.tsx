export function authHeader() {
  // return authorization header with jwt token
  let storedUser = localStorage.getItem("user");
  let user = null;
  if (storedUser) {
    user = JSON.parse(storedUser);
  }

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return { Authorization: "" };
  }
}
