const URL_Requests = {
  login: {
    url: "login",
  },
  signUp: {
    url: "signup",
  },
  me: {
    url: "auth/me",
  },
  users: {
    url: "users",
    editUser: (id) => `users/${id}`,
  }

};

export { URL_Requests };
