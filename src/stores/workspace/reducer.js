export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_WORKSPACE':
      return {
        ...state,
        workspace: action.payload,
      };

    case 'RESET_WORKSPACE':
      return {
        workspace: null,
        isMenuOpening: false,
        isInviteModalOpening: false,
        recentStatusAddedTask: null,
        taskModal: null,
        isOwner: false,
      };

    case 'SET_IS_OWNER':
      return {
        ...state,
        isOwner: action.payload,
      };

    case 'SET_IS_MENU_OPENING':
      return {
        ...state,
        isMenuOpening: action.payload,
      };

    case 'SET_IS_INVITE_MODAL_OPENING':
      return {
        ...state,
        isInviteModalOpening: action.payload,
      };

    case 'SET_TASK_MODAL':
      return {
        ...state,
        taskModal: action.payload,
      };

    case 'SET_RECENT_STATUS_ADDED_TASK':
      return {
        ...state,
        recentStatusAddedTask: { id: action.payload },
      };

    case 'ADD_STATUS':
      return {
        ...state,
        workspace: {
          ...state.workspace,
          statuses: [...state.workspace.statuses, action.payload],
        },
      };

    case 'ADD_TASK':
      return {
        ...state,
        recentStatusAddedTask: { id: action.payload.statusId },
        workspace: {
          ...state.workspace,
          statuses: state.workspace.statuses.map(status => {
            if (status.id === action.payload.statusId) {
              return {
                ...status,
                tasks: [...status.tasks, action.payload],
              };
            }
            return status;
          }),
        },
      };

    case 'DELETE_TASK':
      return {
        ...state,
        workspace: {
          ...state.workspace,
          statuses: state.workspace.statuses.map(status => {
            if (status.id === action.payload.statusId) {
              return {
                ...status,
                tasks: status.tasks.filter(
                  task => task.id !== action.payload.id,
                ),
              };
            }
            return status;
          }),
        },
      };

    case 'DELETE_STATUS':
      return {
        ...state,
        workspace: {
          ...state.workspace,
          statuses: state.workspace.statuses.filter(
            status => status.id !== action.payload,
          ),
        },
      };

    case 'UPDATE_STATUS':
      return {
        ...state,
        workspace: {
          ...state.workspace,
          statuses: state.workspace.statuses.map(status => {
            if (status.id === action.payload.id) {
              return {
                ...status,
                ...action.payload.data,
              };
            }
            return status;
          }),
        },
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        workspace: {
          ...state.workspace,
          statuses: state.workspace.statuses.map(status => {
            if (status.id === action.payload.statusId) {
              return {
                ...status,
                tasks: status.tasks.map(task => {
                  if (task.id === action.payload.id) {
                    return action.payload;
                  }

                  return task;
                }),
              };
            }
            return status;
          }),
        },
      };

    default:
      return state;
  }
}
