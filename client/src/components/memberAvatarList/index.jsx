import { forwardRef } from 'react';
import { MEMBER_AVATAR_LIST_DISPLAY_LIMIT } from '../../constants';
import '../../styles/components/memberAvatarList.css';
import MemberAvatarItem from './memberAvatarItem';
import MemberAvatarMore from './memberAvatarMore';

const MemberAvatarList = forwardRef(
  ({ limit = MEMBER_AVATAR_LIST_DISPLAY_LIMIT, container = null }, ref) => {
    const members = container ? container.object.members : [];

    return (
      <div ref={ref} className='member-avatar-list'>
        {members.slice(0, limit).map((member, index) => (
          <MemberAvatarItem key={index} member={member} container={container} />
        ))}
        {members?.length > limit && (
          <MemberAvatarMore
            members={members}
            value={members.length - limit}
            container={container}
          />
        )}
      </div>
    );
  },
);

export default MemberAvatarList;
