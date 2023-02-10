import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    });

    count === 0 && navigate('/');
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className='container p-5 text-center'>
      <p>Átirányítás ${count} másodperc múlva</p>
    </div>
  );
};

export default LoadingToRedirect;
