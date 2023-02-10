import { useEffect, useState } from 'react';
import { getProduct, updateProduct } from '../../../functions/product';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';

import { getCategories, getCategorySubs } from '../../../functions/category';

const initialState = {
  title: '',
  description: '',
  price: '',

  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus'],
  color: '',
  brand: '',
};

const ProductUpdate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // load single prod
      setValues((prevValues) => ({ ...prevValues, ...p.data }));

      // load subs of the category
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data); // on first load show default subs
      });

      // prepare array of subids to show as default sub values in antd Select
      const arr = p.data.subs.map((sub) => sub._id);

      setArrayOfSubIds((prev) => arr); //required for antd Select to work
    });
  };

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, '---------', value);

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({ ...prevValues, subs: [] }));

    setSelectedCategory(value);

    getCategorySubs(value).then((res) => {
      setSubOptions(res.data);
    });
    // ha váltunk kategóriát kiüresítjük a választott alkategóriákat

    // ha az admin visszatér az eredeti kategóriához akkor betöltük ismét mindent
    // azért, hogy legyenek meg az eredeti alkategóriák
    if (values.category._id === value) {
      loadProduct();
    }

    setArrayOfSubIds([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // vigyázat, a values most már nem tartalmaz mindent
    // ki kell egészíteni a category és subs state-ekkel
    values.subs = arrayOfSubIds;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} is updated`);
        navigate('/admin/products');
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  return (
    <div>
      <div className='col-md-10'>
        {loading ? (
          <LoadingOutlined className='text-danger h1' />
        ) : (
          <h4>Termék módosítása</h4>
        )}

        <hr />
        {/* {JSON.stringify(values)} */}
      </div>

      <div>
        <FileUpload
          values={values}
          setValues={setValues}
          setLoading={setLoading}
        />
      </div>

      <ProductUpdateForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleCategoryChange={handleCategoryChange}
        values={values}
        setValues={setValues}
        categories={categories}
        subOptions={subOptions}
        arrayOfSubIds={arrayOfSubIds}
        setArrayOfSubIds={setArrayOfSubIds}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default ProductUpdate;
