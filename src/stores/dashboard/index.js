import { createContext, useEffect, useReducer } from 'react';
import { randInt } from '../../utils/common';
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

  function fetchOwnWorkspaces() {
    // TODO: call API to fetch own workspaces here
    setTimeout(() => {
      const workspaces = require('../../data/dashboard.json').ownWorkspaces;
      setOwnWorkspaces(workspaces);
    }, randInt(1000, 3000));
  }

  function fetchAllWorkspaces() {
    // TODO: call API to fetch all workspaces here
    setTimeout(() => {
      const workspaces = require('../../data/dashboard.json').allWorkspaces;
      setAllWorkspaces(workspaces);
    }, randInt(1000, 3000));
  }

  function fetchFavoriteWorkspaces() {
    // TODO: call API to fetch favorite workspaces here
    setTimeout(() => {
      const workspaces =
        require('../../data/dashboard.json').favoriteWorkspaces;
      setFavoriteWorkspaces(workspaces);
    }, randInt(1000, 3000));
  }

  function fetchAllTasks() {
    // TODO: call API to fetch all tasks here
    setTimeout(() => {
      const tasks = require('../../data/dashboard.json').allTasks;
      setAllTasks(tasks);
    }, randInt(1000, 3000));
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
