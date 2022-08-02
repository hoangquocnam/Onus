export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_OWN_WORKSPACES':
      return {
        ...state,
        ownWorkspaces: action.payload,
        isLoadingOwnWorkspaces: false,
      };

    case 'SET_ALL_WORKSPACES':
      return {
        ...state,
        allWorkspaces: action.payload,
        isLoadingAllWorkspaces: false,
      };

    case 'SET_FAVORITE_WORKSPACES':
      return {
        ...state,
        favoriteWorkspaces: action.payload,
        isLoadingFavoriteWorkspaces: false,
      };

    case 'SET_ALL_TASKS':
      return {
        ...state,
        allTasks: action.payload,
        isLoadingAllTasks: false,
      };

    default:
      return state;
  }
}
