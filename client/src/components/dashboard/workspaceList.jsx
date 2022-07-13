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

import {
	MdOutlineAddReaction,
	MdAttachFile,
	MdPersonAdd,
} from 'react-icons/md';
import routes from '../../routes';
import '../../styles/components/workspaceListView.scss';

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
  const handleCreateWorkspace = e => {
    e.preventDefault();
    setShowCreateWorkspace(false);
  };

  const fetchWorkspaceList = async () => {
    const response = await methods.get(
      URL_Requests.users.workspaces(account.id),
    );
    console.log(response.data);
    setWorkspaces(response.data);
    return response.data;
  };

  useEffect(() => {
    fetchWorkspaceList();
  }, []);

	function addNewWorkspace() {
		return (
			<form className='workspace-item__add-new-workspace-form'>
				<AiOutlineClose
					className='close-btn'
					size={20}
					onClick={handleCreateWorkspace}
				/>
				<h3>Create New Workspace</h3>
				<input
					type='text'
					placeholder='Workspace name'
					className='workspace-item__add-new-workspace-form-name'
				/>
				<textarea
					type='text'
					placeholder='Workspace description'
					className='workspace-item__add-new-workspace-form-description'
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
				<button className='workspace-item__create-task-btn'>
					Create Workspace
				</button>
			</form>
		);
	}
}
