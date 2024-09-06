import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to SecureHer</h1>
        <p className="text-gray-600 mb-6">
          Your safety, our priority. SecureHer helps you stay safe by sharing your location
          with trusted contacts, sending emergency alerts, and finding nearby safety spots.
        </p>
        <div className="space-x-4">
          <Link to="/signup">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
