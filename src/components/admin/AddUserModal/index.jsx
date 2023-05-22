import { useEffect, createRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { RiCloseFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { methods, URL_Requests } from '../../../APIs';
import { ReactComponent as WavyBorderImage } from '../../../assets/wavy-border.svg';
import { ReactComponent as WorkspaceImage } from '../../../assets/workspace.svg';
import '../../../styles/components/newWorkspaceModal.css';
import { updateUserById } from '../../../APIs/users';

export default function AddUserModal({
  isOpen,
  setIsOpen,
  onAfterCreateNewUser,
  isUpdate,
  defaultUser,
}) {
  const [data, setData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isUpdate) {
      setData({
        fullname: defaultUser.fullname,
        email: defaultUser.email,
        username: defaultUser.username,
        password: defaultUser.password,
      });
    }
  }, [isUpdate, defaultUser]);

  const inputRefs = {
    fullName: createRef(),
    username: createRef(),
    email: createRef(),
    password: createRef(),
  };

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (isUpdate) {
        await toast.promise(
          updateUserById(defaultUser.id, {
            fullname: data.fullname,
            username: data.username,
            email: data.email,
          }),
          {
            pending: 'Loading...',
            success: {
              render() {
                return 'Update user successful';
              },
              autoClose: 1000,
            },
            error: {
              render({ message }) {
                return `Update user failed: ${message}`;
              },
            },
          },
        );
      } else {
        await toast.promise(
          methods.post(URL_Requests.signUp.url, {
            fullname: data.fullname,
            username: data.username,
            email: data.email,
            password: data.password,
          }),
          {
            pending: 'Loading...',
            success: {
              render() {
                return 'Create new user successful';
              },
              autoClose: 1000,
            },
            error: 'Create new user failed',
          },
        );
      }

      setIsOpen(false);
      onAfterCreateNewUser();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleOnExited() {
    setData({
      fullname: '',
      email: '',
      username: '',
      password: '',
    });
  }

  return (
    <Modal
      size='lg'
      enforceFocus={false}
      centered
      show={isOpen}
      onHide={() => setIsOpen(false)}
      onExited={handleOnExited}
      dialogClassName='new-workspace-modal__container'
    >
      <div className='new-workspace-modal'>
        <div className='new-workspace-modal__left'>
          <div className='new-workspace-modal__header'>
            <h2 className='new-workspace-modal__header-title'>
              Let's {isUpdate ? 'update' : 'create'} a new user
            </h2>
          </div>

          <form
            onSubmit={handleFormSubmit}
            className='new-workspace-modal__form'
          >
            <div className='new-workspace-modal__input-group'>
              <label htmlFor='new-workspace-modal__title'>Fullname</label>
              <input
                type='text'
                id='new-workspace-modal__title'
                className='new-workspace-modal__title'
                placeholder='Enter a fullname'
                autoFocus={true}
                ref={inputRefs.fullName}
                value={data.fullname}
                onChange={handleInputChange}
                defaultValue={isUpdate ? defaultUser.fullname : ''}
                disabled={isLoading}
                name='fullname'
              />
            </div>

            <div className='new-workspace-modal__input-group'>
              <label htmlFor='new-workspace-modal__title'>Username</label>
              <input
                ref={inputRefs.username}
                type='text'
                id='new-workspace-modal__title'
                className='new-workspace-modal__title'
                placeholder='Enter a username'
                value={data.username}
                onChange={handleInputChange}
                defaultValue={isUpdate ? defaultUser.username : ''}
                disabled={isLoading}
                name='username'
              />
            </div>

            <div className='new-workspace-modal__input-group'>
              <label htmlFor='new-workspace-modal__title'>Email</label>
              <input
                ref={inputRefs.email}
                type='text'
                id='new-workspace-modal__title'
                className='new-workspace-modal__title'
                placeholder='Enter a email'
                value={data.email}
                onChange={handleInputChange}
                defaultValue={isUpdate ? defaultUser.email : ''}
                disabled={isLoading}
                name='email'
              />
            </div>

            <div className='new-workspace-modal__input-group'>
              <label htmlFor='new-workspace-modal__title'>Password</label>
              <input
                ref={inputRefs.password}
                type='text'
                id='new-workspace-modal__title'
                className='new-workspace-modal__title'
                placeholder='Enter a password'
                value={data.password}
                onChange={handleInputChange}
                hidden={isUpdate}
                defaultValue={isUpdate ? defaultUser.password : ''}
                disabled={isLoading}
                name='password'
              />
            </div>

            <input
              type='submit'
              className='new-workspace-modal__submit-btn'
              value={isUpdate ? 'Update' : 'Create'}
              disabled={isLoading}
            />
          </form>
        </div>

        <div className='new-workspace-modal__right'>
          <WorkspaceImage className='new-workspace-modal__workspace-image' />
          <WavyBorderImage className='new-workspace-modal__wavy-border-image' />
        </div>

        <button
          className='new-workspace-modal__close-btn'
          onClick={() => setIsOpen(false)}
        >
          <RiCloseFill size={28} />
        </button>
      </div>
    </Modal>
  );
}
