import { useMemo, useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import '../../styles/components/memberAvatarMore.css';
import { PopoverContainer } from '../popover';
import MemberAvatarItem from './memberAvatarItem';

export default function MemberAvatarMore(props) {
  return (
    <OverlayTrigger
      trigger='click'
      placement='auto-start'
      rootClose={true}
      overlay={
        <PopoverContainer
          title='Workspace members'
          style={{
            maxWidth: '300px',
            width: '100%',
          }}
        >
          <MemberAvatarMorePopover
            members={props.members}
            container={props.container}
          />
        </PopoverContainer>
      }
    >
      <div className='member-avatar-more disable-user-select'>
        +{props.value}
      </div>
    </OverlayTrigger>
  );
}

function MemberAvatarMorePopover(props) {
  const [searchText, setSearchText] = useState('');

  const members = useMemo(() => {
    if (searchText === '') {
      return props.members;
    }

    return props.members.filter(member => {
      return member.fullname.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [props.members, searchText]);

  function handleOnTextChange(e) {
    setSearchText(e.target.value);
  }

  return (
    <div className='member-avatar-more__popover'>
      <input
        type='text'
        className='member-avatar-more__popover-input'
        autoFocus={true}
        placeholder='Search members'
        value={searchText}
        onChange={handleOnTextChange}
      />

      <div className='member-avatar-more__popover-member-list'>
        {members.map((member, index) => (
          <MemberAvatarItem
            key={index}
            member={member}
            style={{
              width: '32px',
              height: '32px',
            }}
            container={props.container}
          />
        ))}
      </div>
    </div>
  );
}
