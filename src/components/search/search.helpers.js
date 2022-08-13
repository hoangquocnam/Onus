import { methods, URL_Requests } from '../../APIs';
import { toast } from 'react-toastify';

export function countResultType(results, type) {
  if (!results) {
    return 0;
  }

  if (type === 'all') {
    return (
      results.users.length + results.workspaces.length + results.tasks.length
    );
  }

  if (type === 'users') {
    return results.users.length;
  }
  if (type === 'workspaces') {
    return results.workspaces.length;
  }
  if (type === 'tasks') {
    return results.tasks.length;
  }
  return 0;
}

export const FILTER_SEARCH = {
  ALL: 'all',
  WORKSPACE: 'workspaces',
  TASK: 'tasks',
  USER: 'users',
};

export const search = async keyword => {
  try {
    const { data: results } = await methods.get(URL_Requests.utils.search.url, {
      params: { keyword },
    });

    return results;
  } catch (error) {
    toast.error(error.response.data.error.message);
  }
};
