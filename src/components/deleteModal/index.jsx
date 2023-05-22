import { Modal, Button } from 'antd';

const DeleteModal = ({ isModalOpen, handleClose, handleDelete, title }) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleDelete}
      onCancel={handleClose}
      centered
      footer={[
        <Button key='back' onClick={handleClose}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={handleDelete}>
          Submit
        </Button>,
      ]}
    ></Modal>
  );
};

export default DeleteModal;
