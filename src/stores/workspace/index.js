import { createContext, useReducer } from 'react';
import reducer from './reducer';

export const WorkspaceContext = createContext();

export function WorkspaceProvider(props) {
  const [state, dispatch] = useReducer(reducer, {
    workspace: null,
    isMenuOpening: false,
    isInviteModalOpening: false,
    recentStatusAddedTask: null,
    taskModal: null,
  });

  async function getWorkspace(id) {
    try {
      const { data } = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ data: require('../../data/workspace-new.json') });
        }, 1000);
      });

      setWorkspace(data);
    } catch (error) {
      setError(error);
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

  function toggleInviteModal() {
    dispatch({
      type: 'TOGGLE_INVITE_MODAL',
    });
  }

  function setError(error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error,
    });
  }

  function toggleMenu() {
    dispatch({
      type: 'TOGGLE_MENU',
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
      const { data: status } = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data: {
              id: Date.now().toString(),
              title,
              tasks: [],
            },
          });
        }, 0);
      });

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

  async function updateWorkspace(workspace) {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(workspace);
        }, 0);
      });

      setWorkspace(workspace);
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
    try {
      const { data: member } = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data: {
              id: Date.now().toString(),
              avatar: 'https://api.minimalavatars.com/avatar/random/png',
              email: memberEmail,
              fullname: 'Lê Duy Tâm',
            },
          });
        }, 0);
      });

      setWorkspace({
        ...state.workspace,
        members: [...state.workspace.members, member],
      });
    } catch (error) {
      throw error;
    }
  }

  async function removeMemberFromWorkspace(memberId) {
    try {
      if (memberId === state.workspace.ownerId) {
        return;
      }

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

      updateWorkspace(newWorkspace);
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

  return (
    <WorkspaceContext.Provider
      value={{
        ...state,
        getWorkspace,
        toggleMenu,
        addStatus,
        addTask,
        setTaskModal,
        updateWorkspace,
        updateStatus,
        updateTask,
        toggleInviteModal,
        setRecentStatusAddedTask,
        inviteMemberToWorkspace,
        deleteTask,
        deleteStatus,
        removeMemberFromWorkspace,
        removeMemberFromTask,
      }}
    >
      {props.children}
    </WorkspaceContext.Provider>
  );
}
