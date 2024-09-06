import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { db } from '../firebaseConfig'; // Firebase Firestore configuration
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
        (error) => {
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
     
      await addDoc(collection(db, 'incidents'), {
        incidentType,
        description,
        location,
        timestamp: new Date(),
      });
      setSuccess(true);
     
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError('Failed to submit the report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Report an Incident</h2>

        {error && <div className="bg-red-100 p-3 text-red-700 mb-4 rounded">{error}</div>}
        {success && <div className="bg-green-100 p-3 text-green-700 mb-4 rounded">Report submitted successfully!</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Incident Type</label>
            <select
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select Incident Type</option>
              <option value="harassment">Harassment</option>
              <option value="theft">Theft</option>
              <option value="assault">Assault</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Describe the incident in detail..."
            ></textarea>
          </div>

          <div className="mb-4">
            <button
              type="button"
              onClick={handleGetLocation}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {location.latitude && location.longitude
                ? `Location Captured (${location.latitude}, ${location.longitude})`
                : 'Capture Location'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;
