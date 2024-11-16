import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { db } from '../firebaseConfig'; // Uncomment and configure for Firebase Firestore
import { collection, addDoc } from 'firebase/firestore';

const ReportIncident = () => {
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setError('Unable to retrieve your location.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!incidentType || !description) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      
      // await addDoc(collection(db, 'incidents'), {
      //   incidentType,
      //   description,
      //   location,
      //   timestamp: new Date(),
      // });
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch {
      setError('Failed to submit the report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Report an Incident</h2>

        {error && (
          <div
            className="bg-red-100 p-4 text-red-700 border border-red-300 rounded mb-4 animate-fadeIn"
            role="alert"
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="bg-green-100 p-4 text-green-700 border border-green-300 rounded mb-4 animate-fadeIn"
            role="alert"
          >
            Report submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Incident Type <span className="text-red-500">*</span>
            </label>
            <select
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Incident Type</option>
              <option value="harassment">Harassment</option>
              <option value="theft">Theft</option>
              <option value="assault">Assault</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Describe the incident in detail..."
            ></textarea>
          </div>

          <div className="mb-6">
            <button
              type="button"
              onClick={handleGetLocation}
              className={`w-full px-4 py-2 rounded-lg text-white transition ${
                location.latitude && location.longitude
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {location.latitude && location.longitude
                ? `Location Captured (${location.latitude}, ${location.longitude})`
                : 'Capture Location'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;
