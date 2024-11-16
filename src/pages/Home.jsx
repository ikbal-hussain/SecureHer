import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); 
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-t from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="flex flex-col items-center py-12">
        <div className="bg-white text-gray-800 p-8 rounded-lg shadow-xl max-w-4xl text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to SecureHer</h1>
          <p className="text-lg mb-6">
            Your safety, our priority. SecureHer helps you stay safe by sharing your location
            with trusted contacts, sending emergency alerts, and finding nearby safety spots.
          </p>
          <div className="space-x-4">
            {!user ? (
              <>
                <Link to="/signup">
                  <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200">
                    Get Started
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200">
                    Login
                  </button>
                </Link>
              </>
            ) : (
              <Link to="/dashboard">
                <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-200">
                  Go to Dashboard
                </button>
              </Link>
            )}
          </div>
        </div>

        
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-700">Women Safety Tips</h2>
          <ul className="list-inside list-disc text-left space-y-2 text-lg text-gray-800">
            <li>Always share your location with a trusted friend or family member.</li>
            <li>Use a safety app that sends alerts and tracks your location in emergencies.</li>
            <li>Keep your phone charged and easily accessible in case of an emergency.</li>
            <li>Avoid isolated areas, especially at night.</li>
            <li>Trust your instincts—if something feels wrong, take action immediately.</li>
          </ul>
        </div>

       
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-700">Women Safety Laws in India</h2>
          <p className="text-lg text-gray-800 mb-4">
            India has enacted several laws to protect women from violence, harassment, and discrimination:
          </p>
          <ul className="list-inside list-disc text-left space-y-2 text-lg text-gray-800">
            <li><strong>Protection of Women from Domestic Violence Act (2005):</strong> Provides protection to women from domestic violence.</li>
            <li><strong>Sexual Harassment of Women at Workplace (Prevention, Prohibition, and Redressal) Act (2013):</strong> Aims to protect women from sexual harassment in the workplace.</li>
            <li><strong>Indian Penal Code Section 354:</strong> Deals with punishment for assault or criminal force to woman with intent to outrage her modesty.</li>
            <li><strong>Dowry Prohibition Act (1961):</strong> Prohibits the demand, giving, or receiving of dowry in India.</li>
          </ul>
        </div>

       
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-700">Women Helplines in India</h2>
          <ul className="list-inside list-disc text-left space-y-2 text-lg text-gray-800">
            <li><strong>1091:</strong> National Women Helpline for immediate support and assistance.</li>
            <li><strong>181:</strong> Helpline for women facing domestic violence.</li>
            <li><strong>112:</strong> National Emergency Number for police, fire, or medical emergencies.</li>
            <li><strong>100:</strong> Police emergency number for urgent assistance.</li>
          </ul>
        </div>

      
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl text-center mb-10">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-700">Self-defense Tips</h2>
          <ul className="list-inside list-disc text-left space-y-2 text-lg text-gray-800">
            <li>Learn basic self-defense moves, such as using your knees and elbows to protect yourself.</li>
            <li>If someone tries to grab you, yell loudly to attract attention and escape.</li>
            <li>Always carry pepper spray or other non-lethal self-defense tools.</li>
            <li>Avoid walking alone in dimly lit areas or when you're feeling vulnerable.</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl text-center">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-700">Emergency Numbers</h2>
          <ul className="list-inside list-disc text-left space-y-2 text-lg text-gray-800">
            <li><strong>112:</strong> National emergency number (Police, Fire, Ambulance).</li>
            <li><strong>108:</strong> Ambulance service number.</li>
            <li><strong>1098:</strong> Child Helpline for immediate support.</li>
            <li><strong>102:</strong> Ambulance service in rural areas.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
