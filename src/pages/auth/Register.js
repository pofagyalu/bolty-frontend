import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { sendSignInLinkToEmail } from 'firebase/auth';

import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      navigate('/');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const actionCodeSettings = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);

      toast.success(
        `Emailt küldtünk a megadott ${email} címre. Kattints az email-ben levő linkre a regisztráció véglegesítéséhez.`
      );
      window.localStorage.setItem('emailForRegistration', email);

      setEmail('');
    } catch (err) {
      console.log(err);
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='email cím'
        autoFocus
      />
      <br />
      <button type='submit' className='btn btn-raised'>
        Regisztráció
      </button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Regisztráció</h4>

          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
