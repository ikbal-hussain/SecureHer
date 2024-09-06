import React, { useState, useEffect } from 'react';
// import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState('');
  const [locationSharing, setLocationSharing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // const loggedUser = auth.currentUser;
    // if (loggedUser) {
    //   setUser(loggedUser);
    // }

    setUser("Guest");
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null); // Reset user state after logout
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Dashboard</h2>

        {user ? (
          <div className="mb-6">
            <h3 className="text-xl font-bold">Welcome, {user.email}</h3>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="mb-6">
            <h3 className="text-xl font-bold">Welcome, Guest</h3>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Login / Sign Up
            </button>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Emergency Contacts</h3>
          <ul className="list-disc list-inside">
            {contacts.length > 0 ? (
              contacts.map((contact, index) => <li key={index}>{contact}</li>)
            ) : (
              <li>No emergency contacts added</li>
            )}
          </ul>

          <div className="mt-4">
            <input
              type="text"
              value={newContact}
              onChange={(e) => setNewContact(e.target.value)}
              placeholder="Enter emergency contact"
              className="w-full px-4 py-2 border rounded-md"
            />
            <button
              onClick={handleAddContact}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add Contact
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Location Sharing</h3>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={locationSharing}
              onChange={handleLocationSharing}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Share my location with emergency contacts</span>
          </label>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">SOS Button</h3>
          <button
            onClick={handleSOS}
            className="bg-red-500 text-white py-2 px-4 rounded-full w-full hover:bg-red-600"
          >
            Send SOS Alert
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
