import React, { useEffect, useState } from 'react';
import { getUsers, deleteUserById, getUserById } from '../../../APIs/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { PlusOutlined } from '@ant-design/icons';
import { Table, Space, Button } from 'antd';
import '../../../styles/pages/adminPage.css';
import DeleteModal from '../../deleteModal';
import AddUserModal from '../AddUserModal';
import { toast } from 'react-toastify';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [selectedUser, setSelectedUser] = useState({});
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false);
  const [isOpenEditUserModal, setIsOpenEditUserModal] = useState(false);

  const handleGetUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  const handleGetUserById = async userId => {
    const user = await getUserById(userId);
    setSelectedUser(user);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUserById(userId);
      handleGetUsers();
      toast.success('Delete user successfully');
    } catch (error) {
      toast.error('Delete user failed');
    }
  };

  const renderText = (text, record) => {
    let color = '';

    if (record.gender === 'male') {
      color = 'blue';
    } else if (record.gender === 'female') {
      color = 'purple';
    }

    return (
      <span style={{ color: color }}>
        {text.charAt(0).toUpperCase() + text.slice(1)}
      </span>
    );
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Fullname',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: renderText,
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
              setUserId(record.id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: '#ff0000' }} />
          </a>
          <a
            onClick={() => {
              setIsOpenEditUserModal(!isOpenEditUserModal);
              setUserId(record.id);
              handleGetUserById(record.id);
            }}
          >
            <FontAwesomeIcon icon={faEdit} style={{ color: '#0000ff' }} />
          </a>
        </Space>
      ),
    },
  ];

  function onAfterCreateNewUser() {
    handleGetUsers();
  }

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <>
      <div>
        <div className='table-header'>
          <h3 className='table-title'>Users</h3>
          <Button
            className='add-button'
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => setIsOpenAddUserModal(!isOpenAddUserModal)}
          >
            Add new user
          </Button>
        </div>

        <Table
          className='table-container'
          dataSource={users}
          columns={columns}
        />
        <DeleteModal
          isModalOpen={isOpenDeleteModal}
          handleClose={() => setIsOpenDeleteModal(false)}
          handleDelete={() => {
            setIsOpenDeleteModal(false);
            handleDeleteUser();
          }}
          title='Do you want to delete this user?'
        />
        <AddUserModal
          isOpen={isOpenAddUserModal}
          setIsOpen={setIsOpenAddUserModal}
          onAfterCreateNewUser={onAfterCreateNewUser}
          isUpdate={isOpenEditUserModal}
          defaultUser={{}}
        />
        <AddUserModal
          isOpen={isOpenEditUserModal}
          setIsOpen={setIsOpenEditUserModal}
          onAfterCreateNewUser={onAfterCreateNewUser}
          isUpdate={isOpenEditUserModal}
          defaultUser={selectedUser}
        />
      </div>
    </>
  );
};

export default UserTable;
