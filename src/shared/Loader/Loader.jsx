import React from 'react';
import useAuth from '../../hooks/useAuth';

const Loader = () => {
 const {loading}=useAuth()
 if (loading) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-400 dark:border-violet-600"></div>
    </div>
  );
 } else {
  return null;
 }
};

export default Loader;