import { MEMBER_AVATAR_LIST_DISPLAY_LIMIT } from "../../constants";
import "../../styles/components/memberAvatarList.css";

function MemberAvatarList(props) {
  const limit = MEMBER_AVATAR_LIST_DISPLAY_LIMIT;

  return (
    <div className="member-avatar__list">
      {props.members.slice(0, limit).map((member, index) => (
        <div key={index} className="member-avatar__item">
          <img
            src={member.avatar}
            alt="avatar"
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
      ))}
      {props.members.length > limit && (
        <div className="member-avatar__item member-avatar__more disable-user-select">
          +{props.members.length - limit}
        </div>
      )}
    </div>
  );
}

export default MemberAvatarList;
