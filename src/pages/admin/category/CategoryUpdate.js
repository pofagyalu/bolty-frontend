import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';

import { getCategory, updateCategory } from '../../../functions/category';

const CategoryUpdate = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.currentUser);

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(slug).then((c) => {
      setName(c.data.category.name);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);

    updateCategory(slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} kategória módosítva`);
        navigate('/admin/category');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className='col'>
      {loading ? (
        <h4 className='text-danger'>Folyamatban</h4>
      ) : (
        <h4>Kategória módosítása</h4>
      )}
      <hr />

      <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
    </div>
  );
};

export default CategoryUpdate;
