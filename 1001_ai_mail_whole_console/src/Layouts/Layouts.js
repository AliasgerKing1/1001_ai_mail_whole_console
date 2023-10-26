import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Layouts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('1001_ai_console_token');
      const userToken = localStorage.getItem('1001_ai_console_user_token');
      // if (!token) {
      //   navigate('/');
      // }
      if (!token && !userToken) {
        navigate('/signin');
      }
    };

    checkToken();

    // Add event listener for changes in local storage
    window.addEventListener('storage', checkToken);

    // Cleanup event listener
    return () => window.removeEventListener('storage', checkToken);
  }, [navigate]); // Only re-run the effect if navigate function changes

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layouts;
