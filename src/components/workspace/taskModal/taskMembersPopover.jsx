import { useContext, useMemo, useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import { WorkspaceContext } from '../../../stores/workspace';
import '../../../styles/components/taskMembersPopover.css';
import { PopoverContainer } from '../../popover';

export default function TaskMembersPopover({ task, children }) {
  const { workspace, addMemberToTask, removeMemberFromTask } =
    useContext(WorkspaceContext);
  const [searchText, setSearchText] = useState('');

  const workspaceMembers = useMemo(() => {
    if (searchText === '') {
      return workspace.members;
    }

    return workspace.members.filter(member => {
      return member.fullname.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [workspace, searchText]);

  function handleSearchTextChange(e) {
    setSearchText(e.target.value);
  }

  function handleMemberClick(member) {
    const memberIndex = task.members.findIndex(
      taskMember => taskMember.id === member.id,
    );

    if (memberIndex === -1) {
      addMemberToTask(task, member);
    } else {
      removeMemberFromTask(task, member);
    }
  }

  return (
    <OverlayTrigger
      trigger='click'
      rootClose={true}
      placement='bottom-start'
      overlay={
        <PopoverContainer
          title='Members'
          style={{
            maxWidth: '300px',
            width: '100%',
          }}
        >
          <div className='task-members-popover'>
            <input
              type='text'
              className='task-members-popover__input'
              value={searchText}
              onChange={handleSearchTextChange}
              placeholder='Search members'
              autoFocus={true}
            />

            <div className='task-members-popover__list'>
              <h4 className='task-members-popover__list-title'>
                Workspace members
              </h4>

              <div className='task-members-popover__list-items'>
                {workspaceMembers.length > 0
                  ? workspaceMembers.map(member => (
                      <div
                        key={member.id}
                        className='task-members-popover__list-item disable-user-select'
                        onClick={() => handleMemberClick(member)}
                      >
                        <div className='task-members-popover__list-item-avatar'>
                          <img src={member.avatar} alt={member.name} />
                        </div>

                        <div className='task-members-popover__list-item-fullname'>
                          {member.fullname}
                        </div>

                        {task.members.findIndex(
                          taskMember => taskMember.id === member.id,
                        ) !== -1 && (
                          <div className='task-members-popover__list-item-join-icon'>
                            <FaCheck size={10} />
                          </div>
                        )}
                      </div>
                    ))
                  : 'No members found'}
              </div>
            </div>
          </div>
        </PopoverContainer>
      }
    >
      {children}
    </OverlayTrigger>
  );
}
