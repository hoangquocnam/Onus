import { methods, URL_Requests } from '../../APIs';

export const fetchWorkspaceData = async (workspaceId) => {
  const response = await methods.get(
    URL_Requests.workspaces.workspace(workspaceId),
  );
  console.log('response', response);
  return response.data;
};
