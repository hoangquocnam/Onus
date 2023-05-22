import React, { useEffect, useState } from 'react';
import { getTasks, deleteTaskById } from '../../../APIs/tasks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Table, Space } from 'antd';
import '../../../styles/pages/adminPage.css';
import DeleteModal from '../../deleteModal';
import { toast } from 'react-toastify';

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [taskId, setTaskId] = useState('');

  const handleGetTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTaskById(taskId);
      handleGetTasks();
      toast.success('Delete task successfully');
    } catch (error) {
      toast.error('Delete task failed');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Workspace ID',
      dataIndex: 'workspaceId',
      key: 'workspaceId',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
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
              setTaskId(record.id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: '#ff0000' }} />
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <>
      <div>
        <div className='table-header'>
          <h3 className='table-title'>Tasks</h3>
        </div>

        <Table
          className='table-container'
          dataSource={tasks}
          columns={columns}
        />
        <DeleteModal
          isModalOpen={isOpenDeleteModal}
          handleClose={() => setIsOpenDeleteModal(false)}
          handleDelete={() => {
            setIsOpenDeleteModal(false);
            handleDeleteTask();
          }}
          title='Do you want to delete this task?'
        />
      </div>
    </>
  );
};

export default TaskTable;
