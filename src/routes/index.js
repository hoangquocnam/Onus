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
    settings: '/account/settings',
    changePassword: '/account/change-password',
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
  notFound: {
    path: '/notfound',
  },
  about: {
    path: '/about',
  },
  search: {
    path: '/search',
  },
  admin: {
    path: '/admin',
    users: '/admin/users',
    tasks: '/admin/tasks',
    workspaces: '/admin/workspaces',
  },
};

export default routes;
