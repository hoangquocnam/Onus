import { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { RiCloseFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { methods, URL_Requests } from '../../APIs';
import { ReactComponent as WavyBorderImage } from '../../assets/wavy-border.svg';
import { ReactComponent as WorkspaceImage } from '../../assets/workspace.svg';
import { useAccount } from '../../hooks';
import '../../styles/components/newWorkspaceModal.css';

export default function NewWorkspaceModal({
  isOpen,
  setIsOpen,
  onAfterCreatedNewWorkspace,
}) {
  const [data, setData] = useState({
    title: '',
    description: '',
  });
  const { account } = useAccount();
  const titleRef = useRef(null);

  function handleOnSubmit(e) {
    e.preventDefault();

    setData({
      title: data.title.trim(),
      description: data.description.trim(),
    });

    if (data.title.trim().length === 0) {
      titleRef.current.focus();
      toast.error('Title is required');
      return;
    }

    toast.promise(createNewWorkspace(data), {
      pending: 'Creating workspace...',
      success: {
        render() {
          onAfterCreatedNewWorkspace();
          return 'Create workspace successfully';
        },
        autoClose: 1000,
      },
      error: 'Create workspace failed',
    });

    setIsOpen(false);
  }

  function handleInputChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function createNewWorkspace(data) {
    try {
      const response = await methods.post(URL_Requests.workspaces.url, {
        title: data.title.trim(),
        description: data.description.trim(),
        ownerId: account.id,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  function handleOnExited() {
    setData({
      title: '',
      description: '',
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
              Let's create a new workspace
            </h2>

            <p className='new-workspace-modal__header-description'>
              Boost your productivity by organizing your tasks and sharing them
              with your team.
            </p>
          </div>

          <form onSubmit={handleOnSubmit} className='new-workspace-modal__form'>
            <div className='new-workspace-modal__input-group'>
              <label htmlFor='new-workspace-modal__title'>Title</label>
              <input
                ref={titleRef}
                type='text'
                id='new-workspace-modal__title'
                className='new-workspace-modal__title'
                placeholder='Enter a title'
                autoFocus={true}
                value={data.title}
                onChange={handleInputChange}
                name='title'
              />
            </div>

            <div className='new-workspace-modal__input-group'>
              <label htmlFor='new-workspace-modal__visibility'>
                Visibility
              </label>
              <select
                id='new-workspace-modal__visibility'
                className='new-workspace-modal__visibility'
                disabled={true}
              >
                <option value='private'>Private</option>
              </select>
            </div>

            <div className='new-workspace-modal__input-group'>
              <label htmlFor='new-workspace-modal__description'>
                Description
              </label>
              <textarea
                id='new-workspace-modal__description'
                className='new-workspace-modal__description'
                rows={4}
                placeholder='Enter a description'
                value={data.description}
                name='description'
                onChange={handleInputChange}
              ></textarea>
            </div>

            <input
              type='submit'
              className='new-workspace-modal__submit-btn'
              value='Create'
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
