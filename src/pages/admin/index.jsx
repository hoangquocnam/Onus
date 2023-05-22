import React from 'react';
import {
  UserOutlined,
  FundOutlined,
  LogoutOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import '../../styles/pages/adminPage.css';
import UserTable from '../../components/admin/ManagementUser';
import TaskTable from '../../components/admin/ManagementTask';
import WorkspaceTable from '../../components/admin/ManagementWorkspace';
import { useAccount } from '../../hooks';

const { Item } = Menu;

function AdminPage() {
  const { logout } = useAccount();
  const items = [
    {
      label: (
        <a href='/admin/users' rel='noopener noreferrer'>
          Users
        </a>
      ),
      key: 'uses',
      icon: <UserOutlined />,
    },
    {
      label: (
        <a href='/admin/workspaces' rel='noopener noreferrer'>
          Workspaces
        </a>
      ),
      key: 'workspaces',
      icon: <FundOutlined />,
    },
    {
      label: (
        <a href='/admin/tasks' rel='noopener noreferrer'>
          Tasks
        </a>
      ),
      key: 'tasks',
      icon: <OrderedListOutlined />,
    },
  ];

  const renderTable = () => {
    const url = window.location.pathname;
    if (url.endsWith('/admin/workspaces')) {
      return <WorkspaceTable />;
    } else if (url.endsWith('/admin/tasks')) {
      return <TaskTable />;
    } else {
      return <UserTable />;
    }
  };

  return (
    <div className='page-admin-container'>
      <Menu theme='dark' className='side-bar-container'>
        {items.map(menuItem => (
          <Item key={menuItem.key} icon={menuItem.icon}>
            {menuItem.label}
          </Item>
        ))}
        <Item
          className='logout-option'
          key='logout'
          icon={<LogoutOutlined />}
          onClick={logout}
        >
          Logout
        </Item>
      </Menu>
      <div className='table-container'>{renderTable()}</div>
    </div>
  );
}

export default AdminPage;
