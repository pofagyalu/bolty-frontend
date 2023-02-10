import { useEffect, useState } from 'react';
import { createProduct } from '../../../functions/product';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';

import { getCategories, getCategorySubs } from '../../../functions/category';

const initialState = {
  title: 'Macbook',
  description: 'Ez a legjobb Apple termék',
  price: '4500',
  categories: [],
  category: '',
  subs: [],
  shipping: 'Yes',
  quantity: '50',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'], // ezek a lehetőségek
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus'],
  color: 'white', //ez tartalmazza majd a kiválasztott értéket
  brand: 'Apple',
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSubs, setShowSubs] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setValues({ ...values, categories: c.data }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        //ezt a window alert-et csak azért használjuk mert így tudjuk
        // újratölteni az oldalt a második sorban levő paranccsal
        // jó lenne átírni (így akarjuk a sikeres mentés után üressé tenni az input mezőket)
        window.alert(`${res.data.title} termék sikeresen lementve`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
    //
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, '---------', value);

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;

    console.log('CLICKED CATEGORY', value);

    setValues((prevValues) => ({ ...prevValues, subs: [], category: value }));

    getCategorySubs(value).then((res) => {
      console.log('SUB OPTIONS ON CATEGROY CLICK', res.data);
      setSubOptions(res.data);
    });
    setShowSubs(true);
  };

  return (
    <div>
      {loading ? (
        <LoadingOutlined className='text-danger h1' />
      ) : (
        <h4>Termék létrehozása</h4>
      )}
      <hr />

      <div>
        {/* {JSON.stringify(values.images)} */}
        <FileUpload
          values={values}
          setValues={setValues}
          setLoading={setLoading}
        />
      </div>

      <ProductCreateForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        setValues={setValues}
        handleCategoryChange={handleCategoryChange}
        subOptions={subOptions}
        showSubs={showSubs}
      />
    </div>
  );
};

export default ProductCreate;
