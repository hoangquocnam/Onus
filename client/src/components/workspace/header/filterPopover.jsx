import { useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { WorkspaceContext } from '../../../stores/workspace';
import '../../../styles/components/filterPopover.css';
import { PopoverContainer } from '../../popover';

export default function FilterPopover({ children }) {
  const { workspace } = useContext(WorkspaceContext);

  return (
    <OverlayTrigger
      trigger='click'
      placement='bottom-end'
      rootClose={true}
      overlay={
        <PopoverContainer
          title='Filter'
          style={{
            maxWidth: '300px',
          }}
        >
          <div className='filter-popover'>
            <div className='filter-popover__item'>
              <h4 className='filter-popover__item-title'>Keyword</h4>

              <input
                type='text'
                placeholder='Enter a keyword...'
                className='filter-popover__input-keyword'
                autoFocus={true}
              />

              <p className='filter-popover__input-keyword-description'>
                Search tasks by title, members and more
              </p>
            </div>

            <div className='filter-popover__item'>
              <h4 className='filter-popover__item-title'>Members</h4>

              <form className='filter-popover__form-members'>
                <label className='filter-popover__form-members-item'>
                  <input type='checkbox' />
                  <span>No members</span>
                </label>

                <label className='filter-popover__form-members-item'>
                  <input type='checkbox' />
                  <span>All members</span>
                </label>

                <label className='filter-popover__form-members-item'>
                  <input type='checkbox' />
                  <span>Me</span>
                </label>

                <label className='filter-popover__form-members-item'>
                  <input type='checkbox' />

                  <select className='filter-popover__form-members-item-select'>
                    <option>Select a member...</option>
                    {workspace.members.map(member => (
                      <option key={member.id}>{member.fullname}</option>
                    ))}
                  </select>
                </label>
              </form>
            </div>
          </div>
        </PopoverContainer>
      }
    >
      {children}
    </OverlayTrigger>
  );
}
