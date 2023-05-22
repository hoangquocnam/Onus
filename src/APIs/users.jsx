import { URL_Requests, methods } from '../APIs';

export async function getUsers() {
  const users = (await methods.get(URL_Requests.users.url)).data;
  return users;
}

export async function deleteUserById(id) {
  const { data: user } = await methods.delete(
    `${URL_Requests.users.url}/${id}`,
  );
  return user;
}

export async function updateUserById(id, data) {
  const { data: user } = await methods.patch(
    `${URL_Requests.users.url}/${id}`,
    data,
  );
  return user;
}

export async function getUserById(id) {
  const { data: user } = await methods.get(`${URL_Requests.users.url}/${id}`);
  return user;
}
