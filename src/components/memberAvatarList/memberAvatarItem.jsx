import { useContext } from 'react';
import { OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import { RiCloseLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../../hooks';
import routes from '../../routes';
import { WorkspaceContext } from '../../stores/workspace';
import '../../styles/components/memberAvatarItem.css';

export default function MemberAvatarItem({ member, container, allowRemove }) {
  const { removeMemberFromWorkspace, removeMemberFromTask } =
    useContext(WorkspaceContext);
  const { account } = useAccount();

  const navigate = useNavigate();

  function handleViewProfile() {
    navigate(`${routes.account.path}/${member.id}/profile`);
  }

  function handleClosePopover() {
    document.body.click();
  }

  function handleRemoveMember() {
    if (container.type === 'workspace') {
      removeMemberFromWorkspace(member.id);
    }

    if (container.type === 'task') {
      removeMemberFromTask(container.object, member.id);
    }

    handleClosePopover();
  }

  function isShowRemoveButton() {
    return (
      allowRemove &&
      container &&
      (container.type === 'task' ||
        (container.type === 'workspace' &&
          container.object.ownerId !== member.id &&
          container.object.ownerId === account.id))
    );
  }

  return (
    <OverlayTrigger
      trigger='click'
      placement='bottom-start'
      rootClose={true}
      overlay={
        <Popover
          style={{
            maxWidth: '300px',
            width: '100%',
          }}
        >
          <div className='member-avatar-item__popover-container'>
            <div className='member-avatar-item__popover-header'>
              <div className='member-avatar-item__popover-avatar-container'>
                <img src={member.avatar} alt='avatar' draggable={false} />
              </div>

              <div className='member-avatar-item__popover-member-info-container'>
                <h3 className='member-avatar-item__popover-member-fullname'>
                  {member.fullname}
                </h3>
                <p className='member-avatar-item__popover-member-email'>
                  {member.email}
                </p>
              </div>

              <div
                className='member-avatar-item__popover-close-btn'
                onClick={handleClosePopover}
              >
                <RiCloseLine size={24} />
              </div>
            </div>

            <div className='member-avatar-item__popover-group-btn'>
              <div
                className='member-avatar-item__popover-btn'
                onClick={handleViewProfile}
              >
                View Profile
              </div>

              {isShowRemoveButton() && (
                <>
                  <div className='member-avatar-item__popover-separator'></div>

                  <div
                    className='member-avatar-item__popover-btn'
                    onClick={handleRemoveMember}
                  >
                    {container.type === 'workspace'
                      ? 'Remove from workspace'
                      : 'Remove from task'}
                  </div>
                </>
              )}
            </div>
          </div>
        </Popover>
      }
    >
      <div className='member-avatar-item'>
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement='top'
          delay={{ show: 600 }}
          rootClose={true}
          overlay={
            <Tooltip>
              <p className='member-avatar-item__tooltip'>{member.fullname}</p>
            </Tooltip>
          }
        >
          <img src={member.avatar} alt='avatar' draggable={false} />
        </OverlayTrigger>
      </div>
    </OverlayTrigger>
  );
}
