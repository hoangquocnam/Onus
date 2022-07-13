import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { useAccount } from '../../hooks';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineClose,
} from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { IoTextOutline } from 'react-icons/io5';
import {
  MdOutlineAddReaction,
  MdAttachFile,
  MdPersonAdd,
} from 'react-icons/md';
import routes from '../../routes';
import '../../styles/components/workspaceListView.scss';
import { methods, URL_Requests } from '../../APIs';
import { toast } from 'react-toastify';

import TaskListView from "../workspace/taskListView";

function WorkspaceItemCard(props) {
  const { itemId: id, title, description, members } = props;
  const randomColor = ['#EEF7FB', '#f4f4f4', '#F8F1FF', '#FEF7EF'];
  const navigate = useNavigate();

  function handleClickWorkSpace() {
    navigate(`${routes.workspaces.path}/${id}`);
  }

  return (
    <div
      className='workspace-item-card'
      onClick={handleClickWorkSpace}
      tabIndex={0}
      style={{
        backgroundColor:
          randomColor[Math.floor(Math.random() * randomColor.length)],
      }}
    >
      <p className='workspace-item-card-title'>{title}</p>
      <p className='workspace-item-card-description'>{description}</p>

      <div className='workspace-item-card-footer'>
        <div className='workspace-item-card-members'>
          {_.isArray(members)
            ? members.slice(0, 6).map((member, index) => {
                return (
                  <div
                    className='workspace-item-card-member'
                    style={{ left: 20 * index + 'px' }}
                    key={index}
                  >
                    {index <= 4 ? (
                      <img
                        src={member}
                        alt='avatar'
                        style={{
                          width: '30px',
                          height: '30px',
                        }}
                      />
                    ) : (
                      <div>{`+${members.length - index}`}</div>
                    )}
                  </div>
                );
              })
            : 'members'}
        </div>
        <BsArrowRight size={20} className='workspace-item-card-arrow' />
      </div>
    </div>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <button
      disabled={isFirstItemVisible}
      className='workspace-list-view-arrow'
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
      className='workspace-list-view-arrow'
      onClick={() => scrollNext()}
    >
      <AiOutlineArrowRight size={20} />
    </button>
  );
}

export function WorkspaceListView() {
  const [workspaces, setWorkspaces] = useState([]);
  const { account } = useAccount();
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);

  const handleCreateWorkspace = async data => {
    setWorkspaces(prev => [...prev, data]);
    setShowCreateWorkspace(false);
  };

  const handleCancel = e => {
    e.preventDefault();
    setShowCreateWorkspace(false);
  };

  const fetchWorkspaceList = async () => {
    const response = await methods.get(
      URL_Requests.users.workspaces(account.id),
    );
    setWorkspaces(response.data);
    return response.data;
  };

  useEffect(() => {
    fetchWorkspaceList();
  }, []);

  return (
    <React.StrictMode>
      <div className='workspaceListView'>
        <p className='workspaceList__title'>Workspaces</p>

        <div className='workspaceList__container'>
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {workspaces.map(workspace => (
              <WorkspaceItemCard
                key={workspace.id}
                title={workspace.title}
                description={workspace.description}
                itemId={workspace.id}
                members={workspace.members}
              />
            ))}
            <div
              className='workspace-item-card--add-new-workspace'
              onClick={() => setShowCreateWorkspace(true)}
            >
              <p className='workspace-item-card--add-new-workspace-heading'>
                + Add new workspace
              </p>
            </div>
          </ScrollMenu>
        </div>
        {showCreateWorkspace && (
          <BoardNewWorkspace
            handleCreateWorkspace={handleCreateWorkspace}
            handleCancel={handleCancel}
          />
        )}
      </div>
    </React.StrictMode>
  );
}

function BoardNewWorkspace({ handleCreateWorkspace, handleCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { account } = useAccount();

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await methods.post(URL_Requests.workspaces.url, {
        title,
        description,
        ownerId: account.id,
      });
      console.log(response.data);
      handleCreateWorkspace(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    toast.promise(onSubmit(e), {
      pending: 'Loading...',
      success: {
        render() {
          return 'Created workspace successfully';
        },
        autoClose: 1000,
      },
      error: 'Create workspace failed',
    });
  };

  return (
    <form className='workspace-item__add-new-workspace-form'>
      <AiOutlineClose className='close-btn' size={20} onClick={handleCancel} />
      <h3>Create New Workspace</h3>
      <input
        type='text'
        placeholder='Workspace name'
        className='workspace-item__add-new-workspace-form-name'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        type='text'
        placeholder='Workspace description'
        className='workspace-item__add-new-workspace-form-description'
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className='ulities-container'>
        <div className='left'>
          <IoTextOutline size={20} />
          <MdOutlineAddReaction size={20} />
          <MdAttachFile size={20} />
        </div>
        <div className='right'>
          <MdPersonAdd size={20} />
        </div>
      </div>
      <button
        className='workspace-item__create-task-btn'
        onClick={handleSubmit}
      >
        Create Workspace
      </button>
    </form>
  );
}
