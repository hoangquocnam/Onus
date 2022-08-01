import React, { useEffect, useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import '../../styles/components/tasklistView.scss';

import TaskListBoard from './taskListBoard';

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <button
      disabled={isFirstItemVisible}
      className='tasklistView-list-view-arrow'
      onClick={() => scrollPrev()}
    >
      <AiOutlineArrowLeft size={20} />
    </button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <button
      disabled={isLastItemVisible}
      className='tasklistView-list-view-arrow'
      onClick={() => scrollNext()}
    >
      <AiOutlineArrowRight size={20} />
    </button>
  );
}

export function TasksListView() {
  const [workspaces, setWorkspaces] = useState([]);
  useEffect(() => {
    const workspaces = require('../../data/workspaces.json');
    setWorkspaces(workspaces);
  }, []);

  return (
    <React.StrictMode>
      <div className='tasklistViewListView'>
        <p className='tasklistViewList__title'>Tasks</p>

        <div className='tasklistViewList__container'>
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {workspaces.map((task, index) => (
              <TaskListBoard key={index} />
            ))}
          </ScrollMenu>
        </div>
      </div>
    </React.StrictMode>
  );
}
