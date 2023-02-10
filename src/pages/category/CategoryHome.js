import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/cards/ProductCard';

import { getCategory } from '../../functions/category';

const CategoryHome = () => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          {loading ? (
            <h4 className='bg-light p-3 mt-5 mb-5 text-center display-4'>
              Betöltés...
            </h4>
          ) : (
            <h4 className='bg-light p-3 mt-5 mb-5 text-center display-4'>
              {products.length} termék van a "{category.name}" kategóriában
            </h4>
          )}
        </div>
      </div>
      <div className='row'>
        {products.map((product) => (
          <div className='col md-4' key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
