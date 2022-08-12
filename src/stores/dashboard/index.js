import { createContext, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import { methods, URL_Requests } from '../../APIs';
import reducer from './reducer';

export const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    ownWorkspaces: [],
    isLoadingOwnWorkspaces: true,
    allWorkspaces: [],
    isLoadingAllWorkspaces: true,
    favoriteWorkspaces: [],
    isLoadingFavoriteWorkspaces: true,
    allTasks: [],
    isLoadingAllTasks: true,
  });

  function setOwnWorkspaces(workspaces) {
    dispatch({ type: 'SET_OWN_WORKSPACES', payload: workspaces });
  }

  function setAllWorkspaces(workspaces) {
    dispatch({ type: 'SET_ALL_WORKSPACES', payload: workspaces });
  }

  function setFavoriteWorkspaces(workspaces) {
    dispatch({ type: 'SET_FAVORITE_WORKSPACES', payload: workspaces });
  }

  function setAllTasks(tasks) {
    dispatch({ type: 'SET_ALL_TASKS', payload: tasks });
  }

  async function fetchOwnWorkspaces() {
    try {
      const { data: workspaces } = await methods.get(
        URL_Requests.workspaces.ownWorkspaces,
      );

      setOwnWorkspaces(workspaces);
    } catch (error) {
      toast.error(error.response.data.error.message);
      setOwnWorkspaces([]);
    }
  }

  async function fetchAllWorkspaces() {
    try {
      const { data: workspaces } = await methods.get(
        URL_Requests.workspaces.allWorkspaces,
      );

      setAllWorkspaces(workspaces);
    } catch (error) {
      toast.error(error.response.data.error.message);
      setAllWorkspaces([]);
    }
  }

  async function fetchFavoriteWorkspaces() {
    try {
      const { data: workspaces } = await methods.get(
        URL_Requests.workspaces.favoriteWorkspaces,
      );

      setFavoriteWorkspaces(workspaces);
    } catch (error) {
      toast.error(error.response.data.error.message);
      setFavoriteWorkspaces([]);
    }
  }

  function fetchAllTasks() {
    setAllTasks([]);
  }

  useEffect(() => {
    fetchOwnWorkspaces();
    fetchAllWorkspaces();
    fetchFavoriteWorkspaces();
    fetchAllTasks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        setOwnWorkspaces,
        setAllWorkspaces,
        setFavoriteWorkspaces,
        setAllTasks,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
