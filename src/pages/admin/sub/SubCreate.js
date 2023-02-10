import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { getCategories } from '../../../functions/category';
import { createSub, getSub, getSubs, removeSub } from '../../../functions/sub';
import { Link } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import LocalSearch from '../../../components/forms/LocalSearch';

const SubCreate = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [subs, setSubs] = useState([]);

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);

    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} alkategória létrehozva`);
        loadSubs();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // rákérdezünk, hogy biztos ?
    if (window.confirm('Biztos, hogy törölni akarod az alkategóriát?')) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} alkategória törölve`);
          loadSubs();
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
        <h4>Alkategória létrehozása</h4>
      )}

      <div className='form-group'>
        <label>Szülő kategória</label>
        <select
          name='category'
          className='form-control'
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Kérem válasszon</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

      <LocalSearch keyword={keyword} setKeyword={setKeyword} />

      {subs.filter(searched(keyword)).map((s) => (
        <li key={s.id} className='alert alert-secondary'>
          {s.name}{' '}
          <span
            onClick={() => handleRemove(s.slug)}
            className='btn btn-sm float-right'
          >
            <DeleteOutlined className='text-danger' />
          </span>{' '}
          <Link to={`/admin/sub/${s.slug}`}>
            <span className='btn btn-sm float-right'>
              <EditOutlined className='text-warning' />
            </span>
          </Link>
        </li>
      ))}
    </div>
  );
};

export default SubCreate;
