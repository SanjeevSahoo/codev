import * as config from "../utils/config";
import { authHeader } from "../utils/auth-header";
import IUser from "../types/user";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};

function login(email: string, password: string) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${config.APIURL_AUTH}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("remember");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.APIURL_AUTH}/users`, requestOptions).then(
    handleResponse
  );
}

function getById(id: number) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.APIURL_AUTH}/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function register(user: IUser) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${config.APIURL_AUTH}/users/register`, requestOptions).then(
    handleResponse
  );
}

function update(user: IUser) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${config.APIURL_AUTH}/users/${user.id}`, requestOptions).then(
    handleResponse
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id: number) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`${config.APIURL_AUTH}/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response: Response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        //location.reload();
        return Promise.reject("UnAuthorized");
      } else {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
    }

    return data;
  });
}
