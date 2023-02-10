import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';

import { StarOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const RatingModal = ({ children }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      navigate('/login', { state: { from: `/product/${slug}` } });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className='text-danger' /> <br />
        {user ? 'Értékelés' : 'Jelentkezz be az értékeléshez'}
      </div>
      <Modal
        title='Hagyjon értékelést'
        centered
        open={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success('Köszönjük az értékelést. Hamarosan megjelenik.');
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
