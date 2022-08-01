import {
  FaArrowRight,
  FaClock,
  FaImage,
  FaPaperclip,
  FaRegClone,
  FaRegTrashAlt,
  FaShareAlt,
  FaTag,
  FaUserPlus,
} from 'react-icons/fa';
import '../../../styles/components/taskModalSidebar.css';
import TaskCoverPopover from './taskCoverPopover';
import TaskDeletePopover from './taskDeletePopover';
import TaskMembersPopover from './taskMembersPopover';

export default function TaskModalSideBar({ task }) {
  return (
    <div className='task-modal-sidebar'>
      <div className='task-modal-sidebar__item'>
        <h4 className='task-modal-sidebar__item-title'>Add to card</h4>

        <div className='task-modal-sidebar__item-content'>
          <TaskMembersPopover task={task}>
            <button type='button' className='task-modal-sidebar__btn'>
              <FaUserPlus className='task-modal-sidebar__btn-icon' />
              Members
            </button>
          </TaskMembersPopover>

          <button type='button' className='task-modal-sidebar__btn'>
            <FaTag className='task-modal-sidebar__btn-icon' />
            Labels
          </button>

          <button type='button' className='task-modal-sidebar__btn'>
            <FaClock className='task-modal-sidebar__btn-icon' />
            Dates
          </button>

          <button type='button' className='task-modal-sidebar__btn'>
            <FaPaperclip className='task-modal-sidebar__btn-icon' />
            Attachments
          </button>

          <TaskCoverPopover task={task}>
            <button type='button' className='task-modal-sidebar__btn'>
              <FaImage className='task-modal-sidebar__btn-icon' />
              Cover
            </button>
          </TaskCoverPopover>
        </div>
      </div>

      <div className='task-modal-sidebar__item'>
        <h4 className='task-modal-sidebar__item-title'>Actions</h4>

        <div className='task-modal-sidebar__item-content'>
          <button type='button' className='task-modal-sidebar__btn'>
            <FaArrowRight className='task-modal-sidebar__btn-icon' />
            Move
          </button>

          <button type='button' className='task-modal-sidebar__btn'>
            <FaRegClone className='task-modal-sidebar__btn-icon' />
            Copy
          </button>

          <TaskDeletePopover task={task}>
            <button type='button' className='task-modal-sidebar__btn'>
              <FaRegTrashAlt className='task-modal-sidebar__btn-icon' />
              Delete
            </button>
          </TaskDeletePopover>

          <button type='button' className='task-modal-sidebar__btn'>
            <FaShareAlt className='task-modal-sidebar__btn-icon' />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
