import { useRef } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { LIST_VIEW_CARD_BG_COLOR_LIST } from '../../../constants';
import '../../../styles/components/listViewCard.css';
import { limitText, randomItem } from '../../../utils/common';
import MemberAvatarList from '../../memberAvatarList';

export default function ListViewCard({ data, type, onClick }) {
  const ref = useRef();
  const membersRef = useRef(null);

  function handleOnClick(e) {
    if (membersRef.current.contains(e.target)) {
      return;
    }

    if (!ref.current.contains(e.target)) {
      return;
    }

    if (onClick) {
      onClick();
    }
  }

  return (
    <div
      className='list-view-card disable-user-select'
      style={{
        backgroundColor: randomItem(LIST_VIEW_CARD_BG_COLOR_LIST),
      }}
      ref={ref}
      onClick={handleOnClick}
    >
      <h3 className='list-view-card__title'>{limitText(data.title, 25)}</h3>
      <p className='list-view-card__description'>
        {limitText(data.description, 80)}
      </p>

      <div className='list-view-card__footer'>
        <MemberAvatarList
          ref={membersRef}
          allowRemove={false}
          container={{
            type,
            object: data,
          }}
        />
        <BsArrowRight size={20} className='list-view-card__arrow' />
      </div>
    </div>
  );
}
