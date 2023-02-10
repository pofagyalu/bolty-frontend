import { useState, useEffect } from 'react';
import { getWishlist, removeFromWishlist } from '../../functions/user';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => setWishlist(res.data.wishlist));

  const handleRemove = (productId) =>
    removeFromWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });

  return (
    <>
      <div className='col'>
        <h4>Kívánságlista</h4>

        {wishlist.map((p) => (
          <div key={p._id} className='alert alert-secondary'>
            <Link to={`/product/${p.slug}`}>{p.title}</Link>
            <span
              onClick={() => handleRemove(p._id)}
              className='btn btn-sm float-end'
            >
              <DeleteOutlined className='text-danger' />
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Wishlist;
