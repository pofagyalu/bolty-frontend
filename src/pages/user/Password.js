import { useState } from 'react';

import { auth } from '../../firebase';
import { updatePassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const Password = () => {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //
    // console.log(password);
    const user = auth.currentUser;
    updatePassword(user, newPassword)
      .then(() => {
        //
        setLoading(false);
        setNewPassword('');
        toast.success('Jelszó frissítése sikeres');
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'></div>
      <label>Az aktuális jelszó</label>
      <input
        type='password'
        onChange={(e) => setNewPassword(e.target.value)}
        className='form-control'
        placeholder='Adja meg az új jelszót'
        disabled={loading}
        value={newPassword}
      />
      <button
        className='btn btn-primary'
        disabled={!newPassword || newPassword.length < 6 || loading}
      >
        Mentés
      </button>
    </form>
  );

  return (
    <div className='container-fluid'>
      <div className='col'>
        {loading ? (
          <h4 className='text-danger'>Folyamatban...</h4>
        ) : (
          <h4>Jelszó módosítás</h4>
        )}
        {passwordUpdateForm()}
      </div>
    </div>
  );
};

export default Password;
