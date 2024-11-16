import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState('');
  const [locationSharing, setLocationSharing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleAddContact = () => {
    if (newContact.trim() !== '') {
      setContacts([...contacts, newContact]);
      setNewContact('');
    }
  };

  const handleLocationSharing = () => {
    setLocationSharing(!locationSharing);
    if (!locationSharing) {
      alert('Location sharing enabled! Your current location will be shared with emergency contacts.');
    } else {
      alert('Location sharing disabled.');
    }
  };

  const handleSOS = () => {
    alert('SOS Alert sent to your emergency contacts!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-500 via-pink-500 to-red-500 flex items-center justify-center text-white ">
      <div className="bg-white text-gray-800 rounded-lg shadow-xl w-full max-w-4xl p-8 mt-6 mb-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-purple-700">Dashboard</h1>

      
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">
              Welcome, {user ? user.email : 'Guest'}
            </h2>
            {user ? (
              <p className="text-gray-600 mt-2">
                Manage your safety settings and contacts.
              </p>
            ) : (
              <p className="text-gray-600 mt-2">
                Please login to access your dashboard features.
              </p>
            )}
          </div>
          <button
            onClick={user ? handleLogout : () => navigate('/login')}
            className={`py-2 px-6 rounded-lg ${
              user
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-semibold transition duration-300`}
          >
            {user ? 'Logout' : 'Login / Sign Up'}
          </button>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-gray-50 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold mb-4 text-purple-700">
              Emergency Contacts
            </h3>
            <ul className="list-disc list-inside mb-4">
              {contacts.length > 0 ? (
                contacts.map((contact, index) => (
                  <li key={index} className="text-gray-700">
                    {contact}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No emergency contacts added</li>
              )}
            </ul>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                placeholder="Enter emergency contact"
                className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
              />
              <button
                onClick={handleAddContact}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Add
              </button>
            </div>
          </div>

        
          <div className="bg-gray-50 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold mb-4 text-purple-700">
              Location Sharing
            </h3>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={locationSharing}
                onChange={handleLocationSharing}
                className="form-checkbox h-5 w-5 text-purple-600"
              />
              <span className="ml-3 text-gray-700">
                Share my location with emergency contacts
              </span>
            </label>
          </div>

         
          <div className="bg-gray-50 rounded-lg p-6 shadow-md md:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-purple-700">SOS Alert</h3>
            <p className="text-gray-700 mb-4">
              Send an immediate SOS alert to all your emergency contacts.
            </p>
            <button
              onClick={handleSOS}
              className="bg-red-500 text-white py-3 px-6 rounded-full w-full hover:bg-red-600 transition duration-300 font-bold text-lg"
            >
              Send SOS Alert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
