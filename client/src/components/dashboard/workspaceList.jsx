import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
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

function WorkspaceItemCard(props) {
	const { itemId: ownerId, title, description, members } = props;
	const randomColor = ['#EEF7FB', '#f4f4f4', '#F8F1FF', '#FEF7EF'];
	const navigate = useNavigate();

	function handleClickWorkSpace() {
		navigate(`${routes.workspaces.path}/${ownerId}`);
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
	const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);

	function addNewWorkspace(workspace) {
		try {
			const response = methods.post(URL_Requests.createWorkspace, workspace);
			setWorkspaces([
				...workspaces,
				{
					title: workspace.title,
					description: workspace.description,
					ownerId: response.ownerId,
					members: workspace.members,
				},
			]);
			setShowCreateWorkspace(false);
		} catch (error) {
			console.log('có lỗi');
			console.log(error);
		}
	}

	useEffect(() => {
		const workspaces = require('../../data/workspaces.json');
		setWorkspaces(workspaces);
	}, []);

	return (
		<React.StrictMode>
			<div className='workspaceListView'>
				<p className='workspaceList__title'>Workspaces</p>

				<div className='workspaceList__container'>
					<ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
						{workspaces.map((workspace) => (
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
					<NewWorkspaceModal addNewWorkspace={addNewWorkspace} />
				)}
			</div>
		</React.StrictMode>
	);

	function NewWorkspaceModal({ addNewWorkspace }) {
		if (!addNewWorkspace) {
			console.error(' AddNewWorkspace is Null');
		}

		const [title, setTitle] = useState('');
		const [description, setDescription] = useState('');

		function handleOnCreateWorkspace(e) {
			e.preventDefault();
			// TODO: validate input
			addNewWorkspace({
				ownerId: '100',
				title: title,
				description: description,
				members: [],
			});
		}

		return (
			<form className='workspace-item__add-new-workspace-form'>
				<AiOutlineClose
					className='close-btn'
					size={20}
					onClick={addNewWorkspace}
				/>
				<h3>Create New Workspace</h3>
				<input
					type='text'
					placeholder='Workspace name'
					className='workspace-item__add-new-workspace-form-name'
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					type='text'
					placeholder='Workspace description'
					className='workspace-item__add-new-workspace-form-description'
					onChange={(e) => setDescription(e.target.value)}
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
					type='submit'
					className='workspace-item__create-task-btn'
					onClick={handleOnCreateWorkspace}
				>
					Create Workspace
				</button>
			</form>
		);
	}
}
