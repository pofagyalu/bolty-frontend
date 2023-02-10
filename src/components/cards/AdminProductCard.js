import laptop from '../../images/laptop.png';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove, showStatus }) => {
  const { title, description, images, slug } = product;

  return (
    <Card
      hoverable
      style={{ width: 300, objectFit: 'cover' }}
      cover={
        <img
          alt='example'
          src={images && images.length ? images[0].url : laptop}
          className='p-2'
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className='text-warning' />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(slug)}
          className='text-danger'
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 30)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
