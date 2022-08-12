import { useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { COVER_BACKGROUND_COLOR_LIST } from '../../../constants';
import { WorkspaceContext } from '../../../stores/workspace';
import '../../../styles/components/taskCoverPopover.css';
import { getColorCoverUrl } from '../../../utils/common';
import {
  PopoverButton,
  PopoverContainer,
  PopoverSeparator,
} from '../../popover';

export default function TaskCoverPopover({ task, children }) {
  const { updateTask } = useContext(WorkspaceContext);

  function handleCoverColorClick(color) {
    updateTask(task, { cover: getColorCoverUrl(color) });
  }

  function handleRemoveCover() {
    updateTask(task, { cover: '' });
  }

  return (
    <OverlayTrigger
      trigger='click'
      rootClose={true}
      placement='bottom-start'
      overlay={
        <PopoverContainer
          title='Cover'
          style={{
            maxWidth: '300px',
            width: '100%',
          }}
        >
          <div className='task-cover-popover'>
            <div className='task-cover-popover__item'>
              <h4 className='task-cover-popover__item-title'>Colors</h4>

              <div className='task-cover-popover__item-content'>
                <div className='task-cover-popover__item-colors'>
                  {COVER_BACKGROUND_COLOR_LIST.map((color, index) => (
                    <div
                      key={index}
                      className='task-cover-popover__item-color'
                      style={{
                        backgroundColor: color,
                      }}
                      onClick={() => handleCoverColorClick(color)}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div className='task-cover-popover__item'>
              <h4 className='task-cover-popover__item-title'>Attachments</h4>

              <div className='task-cover-popover__item-content'>
                <PopoverButton closedOnClick={true} align='center'>
                  Upload a cover image
                </PopoverButton>
              </div>
            </div>

            {task.cover && (
              <>
                <PopoverSeparator />

                <PopoverButton
                  onClick={handleRemoveCover}
                  align='center'
                  closedOnClick={true}
                >
                  Remove cover
                </PopoverButton>
              </>
            )}
          </div>
        </PopoverContainer>
      }
    >
      {children}
    </OverlayTrigger>
  );
}
