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
  },
};

export { URL_Requests };
