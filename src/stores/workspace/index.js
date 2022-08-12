import { createContext, useReducer } from 'react';
import { methods, URL_Requests } from '../../APIs';
import { useAccount } from '../../hooks';
import reducer from './reducer';

export const WorkspaceContext = createContext();

export function WorkspaceProvider(props) {
  const [state, dispatch] = useReducer(reducer, {
    workspace: null,
    isMenuOpening: false,
    isInviteModalOpening: false,
    recentStatusAddedTask: null,
    taskModal: null,
    isOwner: false,
  });

  const { account } = useAccount();

  function resetWorkspace() {
    dispatch({
      type: 'RESET_WORKSPACE',
    });
  }

  async function getWorkspace(id) {
    try {
      const { data: workspace } = await methods.get(
        URL_Requests.workspaces.workspace(id),
      );

      if (workspace.ownerId === account.id) {
        dispatch({
          type: 'SET_IS_OWNER',
          payload: true,
        });
      }

      setWorkspace(workspace);
    } catch (error) {
      throw error;
    }
  }

  function setWorkspace(workspace) {
    dispatch({
      type: 'SET_WORKSPACE',
      payload: workspace,
    });
  }

  function setRecentStatusAddedTask(statusId) {
    dispatch({
      type: 'SET_RECENT_STATUS_ADDED_TASK',
      payload: statusId,
    });
  }

  function setIsInviteModalOpening(isOpen) {
    dispatch({
      type: 'SET_IS_INVITE_MODAL_OPENING',
      payload: isOpen,
    });
  }

  function setIsMenuOpening(isOpen) {
    dispatch({
      type: 'SET_IS_MENU_OPENING',
      payload: isOpen,
    });
  }

  function setTaskModal(task) {
    dispatch({
      type: 'SET_TASK_MODAL',
      payload: task,
    });
  }

  async function addStatus(title) {
    try {
      const { data: status } = await methods.post(
        URL_Requests.statuses.url,
        {
          title,
          workspaceId: state.workspace.id,
        }
      );

      dispatch({
        type: 'ADD_STATUS',
        payload: status,
      });
    } catch (error) {
      throw error;
    }
  }

  async function addTask(title, statusId) {
    try {
      const { data: task } = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data: {
              id: Date.now().toString(),
              title,
              description: '',
              cover: null,
              labels: [],
              members: [],
              statusId,
            },
          });
        }, 0);
      });

      dispatch({
        type: 'ADD_TASK',
        payload: task,
      });
    } catch (error) {
      throw error;
    }
  }

  async function deleteTask(task) {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true);
        }, 0);
      });

      dispatch({
        type: 'DELETE_TASK',
        payload: task,
      });

      if (state.taskModal?.id === task.id) {
        setTaskModal(null);
      }
    } catch (error) {
      throw error;
    }
  }

  async function deleteStatus(status) {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true);
        }, 0);
      });

      dispatch({
        type: 'DELETE_STATUS',
        payload: status,
      });
    } catch (error) {
      throw error;
    }
  }

  async function updateWorkspace(data) {
    try {
      // setWorkspace({
      //   ...data,
      // });
      setWorkspace({
        ...state.workspace,
        ...data,
      });

      await methods.patch(`workspaces/${state.workspace.id}`, data);
    } catch (error) {
      throw error;
    }
  }

  async function updateStatus(status) {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data: {
              ...status,
            },
          });
        }, 0);
      });

      dispatch({
        type: 'UPDATE_STATUS',
        payload: status,
      });
    } catch (error) {
      throw error;
    }
  }

  async function updateTask(task) {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data: {
              ...task,
            },
          });
        }, 0);
      });

      dispatch({
        type: 'UPDATE_TASK',
        payload: task,
      });

      if (state.taskModal?.id === task.id) {
        setTaskModal(task);
      }
    } catch (error) {
      throw error;
    }
  }

  async function inviteMemberToWorkspace(memberEmail) {
    const { data: member } = await methods.post(
      `workspaces/${state.workspace.id}/members`,
      {
        email: memberEmail,
      },
    );

    setWorkspace({
      ...state.workspace,
      members: [...state.workspace.members, member],
    });
  }

  async function removeMemberFromWorkspace(memberId) {
    try {
      await methods.delete(
        `workspaces/${state.workspace.id}/members/${memberId}`,
      );

      const newWorkspace = {
        ...state.workspace,
        members: state.workspace.members.filter(m => m.id !== memberId),
        statuses: state.workspace.statuses.map(status => ({
          ...status,
          tasks: status.tasks.map(task => ({
            ...task,
            members: task.members.filter(m => m.id !== memberId),
          })),
        })),
      };

      setWorkspace(newWorkspace);
    } catch (error) {
      throw error;
    }
  }

  async function removeMemberFromTask(task, memberId) {
    try {
      updateTask({
        ...task,
        members: task.members.filter(m => m.id !== memberId),
      });
    } catch (error) {
      throw error;
    }
  }

  async function toggleFavorite() {
    try {
      const isFavorite = !state.workspace.isFavorite;

      setWorkspace({
        ...state.workspace,
        isFavorite,
      });

      if (isFavorite) {
        await methods.post(`users/favorite-workspaces/${state.workspace.id}`);
      } else {
        await methods.delete(`users/favorite-workspaces/${state.workspace.id}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async function deleteWorkspace() {
    try {
      await methods.delete(`workspaces/${state.workspace.id}`);
      resetWorkspace();
    } catch (error) {
      throw error;
    }
  }

  async function leaveWorkspace() {
    try {
      await methods.delete(
        `workspaces/${state.workspace.id}/members/${account.id}`,
      );
      resetWorkspace();
    } catch (error) {
      throw error;
    }
  }

  return (
    <WorkspaceContext.Provider
      value={{
        ...state,
        getWorkspace,
        setIsMenuOpening,
        addStatus,
        addTask,
        setTaskModal,
        updateWorkspace,
        updateStatus,
        updateTask,
        setIsInviteModalOpening,
        setRecentStatusAddedTask,
        inviteMemberToWorkspace,
        deleteTask,
        deleteStatus,
        removeMemberFromWorkspace,
        removeMemberFromTask,
        toggleFavorite,
        resetWorkspace,
        deleteWorkspace,
        leaveWorkspace,
      }}
    >
      {props.children}
    </WorkspaceContext.Provider>
  );
}
