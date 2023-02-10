import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category';
import { Link } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // searching/filtering step, 1,2,3, 4 and 5 insert before mapping
  // step 1
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);

    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} kategória létrehozva`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // rákérdezünk, hogy biztos ?
    if (window.confirm('Biztos, hogy törölni akarod a kategóriát?')) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} kategória törölve`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className='col'>
      {loading ? (
        <h4 className='text-danger'>Folyamatban</h4>
      ) : (
        <h4>Kategória létrehozása</h4>
      )}

      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

      {/* step 2 and step 3 átkerült a LocalSearch komponensbe*/}
      <LocalSearch keyword={keyword} setKeyword={setKeyword} />

      {/* step 5 */}
      {categories.filter(searched(keyword)).map((c) => (
        <li key={c.id} className='alert alert-secondary'>
          {c.name}{' '}
          <span
            onClick={() => handleRemove(c.slug)}
            className='btn btn-sm float-right'
          >
            <DeleteOutlined className='text-danger' />
          </span>{' '}
          <Link to={`/admin/category/${c.slug}`}>
            <span className='btn btn-sm float-right'>
              <EditOutlined className='text-warning' />
            </span>
          </Link>
        </li>
      ))}
    </div>
  );
};

export default CategoryCreate;
