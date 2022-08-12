import { useContext, useEffect, useRef, useState } from 'react';
import {
  FaBars,
  FaFilter,
  FaLock,
  FaRegStar,
  FaStar,
  FaUserPlus,
} from 'react-icons/fa';
import { useAccount } from '../../../hooks';
import { WorkspaceContext } from '../../../stores/workspace';
import '../../../styles/components/workspaceHeader.css';
import MemberAvatarList from '../../memberAvatarList';
import FilterPopover from './filterPopover';

export default function WorkspaceHeader() {
  const {
    isMenuOpening,
    setIsMenuOpening,
    setIsInviteModalOpening,
    workspace,
    toggleFavorite,
    isOwner,
  } = useContext(WorkspaceContext);

  const { account } = useAccount();

  function handleFavoriteClick() {
    toggleFavorite();
  }

  return (
    <div className='workspace-header'>
      <div className='workspace-header__left'>
        <TitleInput disabled={!isOwner} />

        <div className='workspace-header__utility'>
          {workspace.isFavorite ? (
            <FaStar
              size={25}
              className='workspace-header__favorite workspace-header__favorite--active'
              onClick={handleFavoriteClick}
            />
          ) : (
            <FaRegStar
              size={25}
              className='workspace-header__favorite'
              onClick={handleFavoriteClick}
            />
          )}

          <div className='workspace-header__separator'></div>

          <div className='workspace-header__visibility'>
            <FaLock size={20} />
            <p>Private</p>
          </div>

          <div className='workspace-header__separator'></div>
        </div>

        <MemberAvatarList
          container={{
            type: 'workspace',
            object: workspace,
          }}
          allowRemove={true}
        />
      </div>

      <div className='workspace-header__right'>
        {account && account.id === workspace.ownerId && (
          <button
            type='button'
            className='workspace-header__btn'
            onClick={() => setIsInviteModalOpening(true)}
          >
            <FaUserPlus size={24} />
            <p>Invite</p>
          </button>
        )}

        <FilterPopover>
          <button type='button' className='workspace-header__btn'>
            <FaFilter size={24} />
            <p>Filter</p>
          </button>
        </FilterPopover>

        {!isMenuOpening && (
          <button
            type='button'
            className='workspace-header__btn'
            onClick={() => setIsMenuOpening(true)}
          >
            <FaBars size={24} />
            <p>Menu</p>
          </button>
        )}
      </div>
    </div>
  );
}

function TitleInput({ disabled = false }) {
  const { workspace, updateWorkspace } = useContext(WorkspaceContext);

  const [title, setTitle] = useState(workspace.title);
  const [width, setWidth] = useState(0);
  const titleRef = useRef(null);
  const spanRef = useRef(null);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleFocusTitle() {
    titleRef.current.select();
  }

  function handleUpdateTitle(e) {
    e.preventDefault();

    titleRef.current.blur();

    if (title.trim() === '' || title.trim() === workspace.title) {
      setTitle(workspace.title);
      return;
    }

    updateWorkspace({ title });
  }

  useEffect(() => {
    setWidth(spanRef.current.offsetWidth);
  }, [title]);

  return (
    <>
      <h1
        ref={spanRef}
        className='workspace-header__title'
        style={{
          opacity: 0,
          position: 'absolute',
          zIndex: -100,
          whiteSpace: 'pre',
        }}
      >
        {title}
      </h1>

      <form onSubmit={handleUpdateTitle}>
        <input
          disabled={disabled}
          ref={titleRef}
          type='text'
          value={title}
          placeholder=''
          className='workspace-header__title'
          onChange={handleTitleChange}
          onFocus={handleFocusTitle}
          onBlur={handleUpdateTitle}
          style={{
            width,
          }}
          maxLength={30}
        />
      </form>
    </>
  );
}
