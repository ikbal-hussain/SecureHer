import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">
          <Link to="/" className="hover:text-yellow-300">SecureShe</Link>
        </div>
        <div className="space-x-6 flex items-center">
          <Link to="/" className="text-white text-lg hover:text-yellow-300">Home</Link>
          {!user ? (
            <>
              <Link to="/login" className="text-white text-lg hover:text-yellow-300">Login</Link>
              <Link to="/signup" className="text-white text-lg bg-yellow-500 hover:bg-yellow-400 text-gray-800 py-2 px-4 rounded-md transition duration-200">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-white text-lg hover:text-yellow-300">Dashboard</Link>
              <Link to="/report-incident" className="text-white text-lg hover:text-yellow-300">Report Incident</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
