import { URL_Requests, methods } from '.';

export async function getTasks() {
  const tasks = (await methods.get(URL_Requests.tasks.url)).data;
  return tasks;
}

export async function deleteTaskById(id) {
  const { data: task } = await methods.delete(
    `${URL_Requests.tasks.url}/${id}`,
  );
  return task;
}
