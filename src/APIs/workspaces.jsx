import { URL_Requests, methods } from '../APIs';

export async function getWorkspaces() {
  const { data: workspaces } = await methods.get(URL_Requests.workspaces.url);
  return workspaces;
}

export async function deleteWorkspaceById(id) {
  const { data: workspace } = await methods.delete(
    `${URL_Requests.workspaces.url}/${id}`,
  );
  return workspace;
}

export async function updateWorkspaceById(id, data) {
  const { data: workspace } = await methods.patch(
    `${URL_Requests.workspaces.url}/${id}`,
    data,
  );
  return workspace;
}

export async function getWorkspaceById(id) {
  const { data: workspace } = await methods.get(
    `${URL_Requests.workspaces.getDetailWorkspaceByAdmin}/${id}`,
  );
  return workspace;
}
