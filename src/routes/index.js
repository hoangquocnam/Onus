const routes = {
  home: {
    path: '/',
  },
  login: {
    path: '/login',
  },
  signUp: {
    path: '/signup',
  },
  account: {
    path: '/account',
    profile: '/account/:id/profile',
    settings: '/account/:id/settings',
  },
  dashboard: {
    path: '/dashboard',
  },
  workspaces: {
    path: '/workspaces',
    workspace: {
      path: '/workspaces/:id',
    },
  },
};

export default routes;
