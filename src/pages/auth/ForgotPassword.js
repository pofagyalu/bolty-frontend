import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) {
    }
    navigate('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const actionCodeSettings = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setEmail('');
      setIsLoading(false);
      toast.success(
        'Az új jelszóbeállító email-t elküldtük. Kattints a jelszó reset linkre.'
      );
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className='container col-md-6 offset-md-3 p-5'>
      {isLoading && <h4 className='danger'>Betöltés</h4>}
      {!isLoading && <h4>Elfelejtett jelszó</h4>}

      <form onSubmit={handleSubmit}>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Add meg az email címedet'
          autoFocus
        ></input>
        <br />
        <button className='btn btn-raised' disabled={!email}>
          Új jelszót kérek
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
