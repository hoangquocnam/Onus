import {
  FaBars,
  FaFilter,
  FaLock,
  FaRegStar,
  FaUserPlus,
} from 'react-icons/fa';
import '../../styles/components/workspaceHeader.css';
import MemberAvatarList from '../memberAvatarList';

function WorkspaceHeader(props) {
  return (
    <div className='workspace-header'>
      <div className='workspace-header__left'>
        <h1 className='workspace-header__title'>{props.workspace.title}</h1>

        <div className='workspace-header__utility'>
          <FaRegStar size={25} className='workspace-header__bookmark' />

          <div className='workspace-header__separator'></div>

          <div className='workspace-header__visibility'>
            <FaLock size={20} />
            <p>Private</p>
          </div>

          <div className='workspace-header__separator'></div>
        </div>

        <MemberAvatarList members={props.workspace.members} />
      </div>

      <div className='workspace-header__right'>
        <button type='button' className='workspace-header__btn'>
          <FaUserPlus size={24} />
          <p>Invite</p>
        </button>

        <button type='button' className='workspace-header__btn'>
          <FaFilter size={24} />
          <p>Filter</p>
        </button>

        <button
          type='button'
          className='workspace-header__btn'
          onClick={props.showMenu}
        >
          <FaBars size={24} />
          <p>Menu</p>
        </button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
