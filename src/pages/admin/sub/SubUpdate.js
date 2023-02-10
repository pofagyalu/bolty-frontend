import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';
import { getCategories } from '../../../functions/category';
import { getSub, updateSub } from '../../../functions/sub';

const SubUpdate = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.currentUser);

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [parent, setParent] = useState('');

  useEffect(() => {
    loadCategories();
    console.log(categories);
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    getSub(slug).then((s) => {
      console.log(s.data.sub);
      setName(s.data.sub.name);
      setParent(s.data.sub.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);

    updateSub(slug, { name, parent }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} alkategória módosítva`);
        navigate('/admin/sub');
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
        <h4>Alkategória módosítása</h4>
      )}

      <div className='form-group'>
        <label>Szülő kategória</label>
        <select
          name='category'
          className='form-control'
          value={parent}
          onChange={(e) => setParent(e.target.value)}
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
      <hr />
    </div>
  );
};

export default SubUpdate;
