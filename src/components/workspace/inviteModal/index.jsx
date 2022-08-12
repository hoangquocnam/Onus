import { useContext, useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { RiCloseFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { AccountContext } from '../../../stores/account';
import { WorkspaceContext } from '../../../stores/workspace';
import '../../../styles/components/inviteModal.css';
import { scrollToRef } from '../../../utils/common';
import { validateEmail } from '../../../utils/validate';

export default function InviteModal() {
  const {
    workspace,
    isInviteModalOpening,
    setIsInviteModalOpening,
    inviteMemberToWorkspace,
  } = useContext(WorkspaceContext);
  const { account } = useContext(AccountContext);
  const [email, setEmail] = useState('');
  const emailInputRef = useRef(null);
  const dummyDivRef = useRef(null);

  async function handleOnSubmit(e) {
    e.preventDefault();

    const error = validateEmail(email);

    if (error !== '') {
      toast.error(error);

      emailInputRef.current.select();
      emailInputRef.current.focus();

      return;
    }

    try {
      await inviteMemberToWorkspace(email);
      setEmail('');
    } catch (error) {
      emailInputRef.current.select();
      emailInputRef.current.focus();
      toast.error(error.response.data.error.message);
    }
  }

  function handleOnEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleOnExited() {
    setEmail('');
  }

  useEffect(() => {
    if (isInviteModalOpening) {
      scrollToRef(dummyDivRef);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspace]);

  return (
    <Modal
      size='lg'
      show={isInviteModalOpening}
      onHide={() => setIsInviteModalOpening(false)}
      onExited={handleOnExited}
      centered
    >
      <div className='invite-modal__container'>
        <header className='invite-modal__header'>
          <h3 className='invite-modal__title'>Invite to workspace</h3>

          <span
            className='invite-modal__close'
            onClick={() => setIsInviteModalOpening(false)}
          >
            <RiCloseFill size={28} />
          </span>
        </header>

        <form className='invite-modal__form' onSubmit={handleOnSubmit}>
          <input
            type='text'
            className='invite-modal__input'
            placeholder='Enter email address'
            autoFocus={true}
            value={email}
            onChange={handleOnEmailChange}
            ref={emailInputRef}
          />

          <select className='invite-modal__role-select' disabled={true}>
            <option value='member'>Member</option>
          </select>

          <input type='submit' className='invite-modal__btn' value='Invite' />
        </form>

        <div className='invite-modal__members'>
          {workspace.members.map((member, index) => (
            <div key={index} className='invite-modal__member'>
              <img
                src={member.avatar}
                alt='avatar'
                className='invite-modal__member-avatar'
              />

              <div className='invite-modal__member-wrapper'>
                <div className='invite-modal__member-info'>
                  <h5 className='invite-modal__member-fullname'>
                    {member.fullname} {member.id === account.id && '(You)'}
                  </h5>

                  <p className='invite-modal__member-email'>{member.email}</p>
                </div>

                <p className='invite-modal__member-role'>
                  {member.id === workspace.ownerId ? 'Admin' : 'Member'}
                </p>
              </div>
            </div>
          ))}

          <div ref={dummyDivRef} />
        </div>
      </div>
    </Modal>
  );
}
