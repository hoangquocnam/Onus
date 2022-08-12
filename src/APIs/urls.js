const URL_Requests = {
  login: {
    url: 'login',
  },
  signUp: {
    url: 'signup',
  },
  me: {
    url: 'auth/me',
  },
  users: {
    url: 'users',
    editUser: id => `users/${id}`,
    workspaces: id => `users/${id}/workspaces`,
  },
  workspaces: {
    url: 'workspaces',
    workspace: id => `workspaces/${id}`,
    ownWorkspaces: 'workspaces/own',
    allWorkspaces: 'workspaces/all',
    favoriteWorkspaces: 'workspaces/favorite',
  },
  statuses: {
    url: 'statuses',
    status: id => `statuses/${id}`,
  }
};

export { URL_Requests };
