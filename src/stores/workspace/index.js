import { createContext, useReducer, useRef } from 'react';
import { toast } from 'react-toastify';
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

  const taskMoveFrom = useRef(null);
  const taskMoveTo = useRef(null);

  const { account } = useAccount();

  function resetWorkspace() {
    dispatch({
      type: 'RESET_WORKSPACE',
    });
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

  async function addStatus(title) {
    try {
      const { data: status } = await methods.post(URL_Requests.statuses.url, {
        title,
        workspaceId: state.workspace.id,
      });

      dispatch({
        type: 'ADD_STATUS',
        payload: status,
      });
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  }

  async function addTask(title, statusId) {
    try {
      const { data: task } = await methods.post(URL_Requests.tasks.url, {
        title,
        statusId,
        workspaceId: state.workspace.id,
      });

      dispatch({
        type: 'ADD_TASK',
        payload: task,
      });
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  }

  async function deleteTask(task) {
    try {
      dispatch({
        type: 'DELETE_TASK',
        payload: task,
      });

      if (state.taskModal?.id === task.id) {
        setTaskModal(null);
      }

      await methods.delete(URL_Requests.tasks.task(task.id));
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  }

  async function deleteStatus(id) {
    try {
      dispatch({
        type: 'DELETE_STATUS',
        payload: id,
      });

      await methods.delete(URL_Requests.statuses.status(id));
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  }

  async function updateWorkspace(data) {
    try {
      setWorkspace({
        ...state.workspace,
        ...data,
      });

      await methods.patch(`workspaces/${state.workspace.id}`, data);
    } catch (error) {
      throw error;
    }
  }

  async function updateStatusListOfWorkspace(statuses) {
    try {
      setWorkspace({
        ...state.workspace,
        statuses,
      });

      await methods.patch(`workspaces/${state.workspace.id}`, {
        statusIdList: statuses.map(status => status.id),
      });
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  }

  async function updateStatus(id, data) {
    try {
      dispatch({
        type: 'UPDATE_STATUS',
        payload: {
          id,
          data,
        },
      });

      await methods.patch(URL_Requests.statuses.status(id), data);
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  }

  async function updateTask(task, data) {
    try {
      task = {
        ...task,
        ...data,
      };

      dispatch({
        type: 'UPDATE_TASK',
        payload: task,
      });

      if (state.taskModal?.id === task.id) {
        setTaskModal(task);
      }

      await methods.patch(URL_Requests.tasks.task(task.id), data);
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  }

  async function updateMembersOfTask(task, members) {
    try {
      task = {
        ...task,
        members,
      };

      dispatch({
        type: 'UPDATE_TASK',
        payload: task,
      });

      if (state.taskModal?.id === task.id) {
        setTaskModal(task);
      }

      await methods.patch(URL_Requests.tasks.task(task.id), {
        memberIdList: members.map(member => member.id),
      });
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  }

  async function addMemberToTask(task, member) {
    try {
      task = {
        ...task,
        members: [...task.members, member],
      };

      dispatch({
        type: 'UPDATE_TASK',
        payload: task,
      });

      if (state.taskModal?.id === task.id) {
        setTaskModal(task);
      }

      await methods.post(`tasks/${task.id}/members`, {
        memberId: member.id,
      });
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  }

  async function removeMemberFromTask(task, member) {
    try {
      task = {
        ...task,
        members: task.members.filter(m => m.id !== member.id),
      };

      dispatch({
        type: 'UPDATE_TASK',
        payload: task,
      });

      if (state.taskModal?.id === task.id) {
        setTaskModal(task);
      }

      await methods.delete(`tasks/${task.id}/members/${member.id}`);
    } catch (error) {
      toast.error(error.response.data.error.message);
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
      toast.error(error.response.data.error.message);
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
      toast.error(error.response.data.error.message);
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

  async function updateMovingTask() {
    if (taskMoveFrom === null || taskMoveTo === null) {
      return;
    }

    const fromStatusIndex = taskMoveFrom.current.statusIndex;
    const toStatusIndex = taskMoveTo.current.statusIndex;
    const fromTaskIndex = taskMoveFrom.current.taskIndex;
    const toTaskIndex = taskMoveTo.current.taskIndex;

    if (fromStatusIndex === toStatusIndex && fromTaskIndex === toTaskIndex) {
      return;
    }

    const statuses = [...state.workspace.statuses];

    const [task] = statuses[fromStatusIndex].tasks.splice(fromTaskIndex, 1);
    statuses[toStatusIndex].tasks.splice(toTaskIndex, 0, task);

    setWorkspace({
      ...state.workspace,
      statuses,
    });

    taskMoveFrom.current = null;
    taskMoveTo.current = null;

    try {
      await methods.post(`tasks/${task.id}/move`, {
        statusId: statuses[toStatusIndex].id,
        taskIndex: toTaskIndex,
      });
    } catch (error) {
      toast.error(error.response.data.error.message);
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
        removeMemberFromWorkspace,
        deleteTask,
        deleteStatus,
        toggleFavorite,
        resetWorkspace,
        deleteWorkspace,
        leaveWorkspace,
        updateStatusListOfWorkspace,
        updateMembersOfTask,
        addMemberToTask,
        removeMemberFromTask,
        updateMovingTask,
        taskMoveFrom,
        taskMoveTo,
      }}
    >
      {props.children}
    </WorkspaceContext.Provider>
  );
}
