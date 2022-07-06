const routes = {
  home: {
    path: "/",
  },
  login: {
    path: "/login",
  },
  signUp: {
    path: "/signup",
  },
  account: {
    path: "/account",
  },
  dashboard: {
    path: "/dashboard",
  },
  workspaces: {
    path: "/workspaces",
    workspace: "/workspaces/:id"
  }
};

export default routes;
