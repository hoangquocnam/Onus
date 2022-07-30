import { useContext, useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import {
  FaBars,
  FaCog,
  FaRegCopy,
  FaRegEye,
  FaRegTrashAlt,
  FaShareAlt,
  FaStream,
  FaTrello,
  FaUsers,
  FaUserShield,
} from 'react-icons/fa';
import { RiCloseFill } from 'react-icons/ri';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';
import { WorkspaceContext } from '../../../stores/workspace';
import '../../../styles/components/workspaceMenu.css';
import MemberAvatarList from '../../memberAvatarList';
import WorkspaceDeletePopover from './workspaceDeletePopover';

export default function WorkspaceMenu() {
  const { toggleMenu, isMenuOpening, workspace, updateWorkspace } =
    useContext(WorkspaceContext);

  const [data, setData] = useState({
    description: workspace.description,
    isOnEditingDescription: false,
  });

  useEffect(() => {
    if (isMenuOpening) {
      setData({
        description: workspace.description,
        isOnEditingDescription: false,
      });
    }
  }, [isMenuOpening, setData, workspace]);

  function handleOnClickDescription(e) {
    if (!data.isOnEditingDescription) {
      e.target.select();
    }

    setData({
      ...data,
      isOnEditingDescription: true,
    });
  }

  function handleOnUpdateDescription() {
    data.description = data.description.trim();

    updateWorkspace({
      ...workspace,
      description: data.description,
    });

    setData({
      ...data,
      isOnEditingDescription: false,
    });
  }

  function handleCancelUpdateDescription() {
    setData({
      description: workspace.description,
      isOnEditingDescription: false,
    });
  }

  function handleCopyWorkspaceToClipboard() {
    navigator.clipboard.writeText(JSON.stringify(workspace));
    toast.success('Workspace JSON copied to clipboard!');
  }

  function handleOnInputChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <div
      className={`workspace-menu workspace-menu--${
        isMenuOpening ? 'active' : 'inactive'
      }`}
    >
      <div className='workspace-menu__header'>
        <h3 className='workspace-menu__title'>Menu</h3>

        <div className='workspace-menu__close-btn' onClick={toggleMenu}>
          <RiCloseFill size={28} />
        </div>
      </div>

      <div className='workspace-menu__body'>
        <Accordion>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>
              <div className='workspace-menu__accordion-header'>
                <FaTrello className='workspace-menu__accordion-header-icon' />

                <h4 className='workspace-menu__accordion-header-title'>
                  About this workspace
                </h4>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className='workspace-menu__about'>
                <div className='workspace-menu__about-item'>
                  <div className='workspace-menu__about-item-header'>
                    <FaUserShield className='workspace-menu__about-item-icon' />
                    <h5 className='workspace-menu__about-item-title'>Owner</h5>
                  </div>

                  <div className='workspace-menu__about-item-body workspace-menu__about-admin'>
                    <img
                      src='https://api.minimalavatars.com/avatar/random/png'
                      alt='avatar'
                      className='workspace-menu__about-admin-avatar'
                    />

                    <div className='workspace-menu__about-admin-info'>
                      <h5 className='workspace-menu__about-admin-info-name'>
                        Lê Duy Tâm
                      </h5>

                      <p className='workspace-menu__about-admin-info-email'>
                        ldtam@demo.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className='workspace-menu__about-item'>
                  <div className='workspace-menu__about-item-header'>
                    <FaUsers className='workspace-menu__about-item-icon' />
                    <h5 className='workspace-menu__about-item-title'>
                      Members
                    </h5>
                  </div>

                  <div className='workspace-menu__about-item-body'>
                    <MemberAvatarList
                      limit={10}
                      container={{
                        type: 'workspace',
                        object: workspace,
                      }}
                    />
                  </div>
                </div>

                <div className='workspace-menu__about-item'>
                  <div className='workspace-menu__about-item-header'>
                    <FaBars className='workspace-menu__about-item-icon' />
                    <h5 className='workspace-menu__about-item-title'>
                      Description
                    </h5>
                  </div>

                  <div className='workspace-menu__about-item-body'>
                    <div className='workspace-menu__description'>
                      <TextareaAutosize
                        className={`workspace-menu__description-input workspace-menu__description-input--${
                          data.isOnEditingDescription ? 'active' : ''
                        }`}
                        placeholder='Add a more detailed description...'
                        name='description'
                        minRows={8}
                        maxRows={8}
                        onChange={handleOnInputChange}
                        value={data.description}
                        onClick={handleOnClickDescription}
                        maxLength={200}
                      />

                      {data.isOnEditingDescription && (
                        <div className='workspace-menu__description-btn-group'>
                          <button
                            type='button'
                            className='workspace-menu__description-save-btn'
                            onClick={handleOnUpdateDescription}
                          >
                            Save
                          </button>

                          <button
                            type='button'
                            className='workspace-menu__description-cancel-btn'
                            onClick={handleCancelUpdateDescription}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>
              <div className='workspace-menu__accordion-header'>
                <FaCog className='workspace-menu__accordion-header-icon' />

                <h4 className='workspace-menu__accordion-header-title'>
                  Settings
                </h4>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className='workspace-menu__settings'>
                <button type='button' className='workspace-menu__settings-item'>
                  <FaRegCopy className='workspace-menu__settings-item-icon' />

                  <span className='workspace-menu__settings-item-text'>
                    Copy workspace
                  </span>
                </button>

                <button type='button' className='workspace-menu__settings-item'>
                  <FaRegEye className='workspace-menu__settings-item-icon' />

                  <span className='workspace-menu__settings-item-text'>
                    Watch
                  </span>
                </button>

                <button
                  type='button'
                  className='workspace-menu__settings-item'
                  onClick={handleCopyWorkspaceToClipboard}
                >
                  <FaShareAlt className='workspace-menu__settings-item-icon' />
                  <span className='workspace-menu__settings-item-text'>
                    Export JSON to clipboard
                  </span>
                </button>

                <WorkspaceDeletePopover>
                  <button
                    type='button'
                    className='workspace-menu__settings-item'
                  >
                    <FaRegTrashAlt className='workspace-menu__settings-item-icon' />
                    <span className='workspace-menu__settings-item-text'>
                      Delete workspace
                    </span>
                  </button>
                </WorkspaceDeletePopover>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='2'>
            <Accordion.Header>
              <div className='workspace-menu__accordion-header'>
                <FaStream className='workspace-menu__accordion-header-icon' />

                <h4 className='workspace-menu__accordion-header-title'>
                  Recent activity
                </h4>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              This function is not yet implemented.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
