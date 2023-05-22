import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Table, Space, Button } from 'antd';
import '../../../styles/pages/adminPage.css';
import { PlusOutlined } from '@ant-design/icons';
import {
  getWorkspaces,
  deleteWorkspaceById,
  getWorkspaceById,
} from '../../../APIs/workspaces';
import DeleteModal from '../../deleteModal';
import AddWorkspaceModal from '../AddWorkspaceModal';
import { toast } from 'react-toastify';

const WorkspaceTable = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState({});
  const [workspaceId, setWorkspaceId] = useState('');
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenAddWorkspaceModal, setIsOpenAddWorkspaceModal] = useState(false);
  const [isOpenEditWorkspaceModal, setIsOpenEditWorkspaceModal] =
    useState(false);

  const handleGetWorkspaces = async () => {
    const workspaces = await getWorkspaces();
    setWorkspaces(workspaces);
  };

  const handleGetWorkspaceById = async workspaceId => {
    const workspace = await getWorkspaceById(workspaceId);
    setSelectedWorkspace(workspace);
  };

  const handleDeleteWorkspace = async () => {
    try {
      await deleteWorkspaceById(workspaceId);
      handleGetWorkspaces();
      toast.success('Delete workspace successfully');
    } catch (error) {
      toast.error('Delete workspace failed');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Owner ID',
      dataIndex: 'ownerId',
      key: 'ownerId',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Total Member',
      dataIndex: 'memberIdList',
      key: 'memberIdList',
      align: 'center',
      render: memberIdList =>
        memberIdList.length ? memberIdList.length : 'No member',
    },

    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <a
            onClick={() => {
              setIsOpenDeleteModal(!isOpenDeleteModal);
              setWorkspaceId(record.id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: '#ff0000' }} />
          </a>
          <a
            onClick={() => {
              setIsOpenEditWorkspaceModal(!isOpenEditWorkspaceModal);
              setWorkspaceId(record.id);
              handleGetWorkspaceById(record.id);
            }}
          >
            <FontAwesomeIcon icon={faEdit} style={{ color: '#0000ff' }} />
          </a>
        </Space>
      ),
    },
  ];

  function onAfterCreatedNewWorkspace() {
    handleGetWorkspaces();
  }

  useEffect(() => {
    handleGetWorkspaces();
  }, []);

  return (
    <>
      <div>
        <div className='table-header'>
          <h3 className='table-title'>Workspaces</h3>
          <Button
            className='add-button'
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => setIsOpenAddWorkspaceModal(!isOpenAddWorkspaceModal)}
          >
            Add new workspace
          </Button>
        </div>
        <Table
          className='table-container'
          dataSource={workspaces}
          columns={columns}
        />
        <DeleteModal
          isModalOpen={isOpenDeleteModal}
          handleClose={() => setIsOpenDeleteModal(false)}
          handleDelete={() => {
            setIsOpenDeleteModal(false);
            handleDeleteWorkspace();
          }}
          title='Do you want to delete this workspace ?'
        />
        <AddWorkspaceModal
          isOpen={isOpenAddWorkspaceModal}
          setIsOpen={setIsOpenAddWorkspaceModal}
          onAfterCreatedNewWorkspace={onAfterCreatedNewWorkspace}
          isUpdate={false}
          defaultWorkspace={{}}
        />

        <AddWorkspaceModal
          isOpen={isOpenEditWorkspaceModal}
          setIsOpen={setIsOpenEditWorkspaceModal}
          onAfterCreatedNewWorkspace={onAfterCreatedNewWorkspace}
          isUpdate={true}
          defaultWorkspace={selectedWorkspace}
        />
      </div>
    </>
  );
};

export default WorkspaceTable;
