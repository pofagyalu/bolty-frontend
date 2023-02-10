import { useEffect, useState } from 'react';
import { getProductsByCount } from '../../../functions/product';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { removeProduct } from '../../../functions/product';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(10)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    if (window.confirm('Biztos, hogy törölni akarod?')) {
      // console.log('send delete requesrt', slug);
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} törölve!`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className='col'>
        {loading ? (
          <h4 className='text-danger'>Betöltés...</h4>
        ) : (
          <h4>Összes termék</h4>
        )}
        <div className='row'>
          {products.map((product) => (
            <div key={product._id} className='col-md-4 pb-3'>
              <AdminProductCard product={product} handleRemove={handleRemove} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
