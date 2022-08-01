import { forwardRef } from 'react';
import { MEMBER_AVATAR_LIST_DISPLAY_LIMIT } from '../../constants';
import '../../styles/components/memberAvatarList.css';
import MemberAvatarItem from './memberAvatarItem';
import MemberAvatarMore from './memberAvatarMore';

const MemberAvatarList = forwardRef(
  (
    {
      limit = MEMBER_AVATAR_LIST_DISPLAY_LIMIT,
      container = null,
      allowRemove = false,
    },
    ref,
  ) => {
    const members = container?.object?.members || [];

    return (
      <div ref={ref} className='member-avatar-list'>
        {members.slice(0, limit).map((member, index) => (
          <MemberAvatarItem
            key={index}
            member={member}
            container={container}
            allowRemove={allowRemove}
          />
        ))}
        {members?.length > limit && (
          <MemberAvatarMore
            members={members}
            value={members.length - limit}
            container={container}
            allowRemove={allowRemove}
          />
        )}
      </div>
    );
  },
);

export default MemberAvatarList;
