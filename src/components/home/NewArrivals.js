import { useEffect, useState } from 'react';

import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';

import { getProducts, getProductsCount } from '../../functions/product';
import { Pagination } from 'antd';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // több useEffect esetében a felső fut le először
  useEffect(() => {
    loadAllProducts();
    // ha tehát változik az oldalszám újból betöltjük az adatokat
  }, [currentPage]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort , order, limit
    getProducts('createdAt', 'desc', currentPage).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  const pageChangeHandler = (page) => setCurrentPage(page);

  return (
    <>
      <div className='container'>
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className='row'>
            {products.map((product) => (
              <div key={product._id} className='col -md-4'>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='row'>
        <nav className='col-md-4 offset-md-4 text-center p-3'>
          <Pagination
            current={currentPage}
            total={(productsCount / 3) * 10}
            onChange={pageChangeHandler}
          />
        </nav>
      </div>
    </>
  );
};

export default NewArrivals;
