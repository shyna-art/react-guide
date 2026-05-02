import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Import Supabase client
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import BlushingLoveImage from '../assets/images/BlushingLove.jpg';
import GoldenGlowImage from '../assets/images/GoldenGlow.jpg';
import PureEleganceImage from '../assets/images/PureElegance.jpg';
import ScarletRomanceImage from '../assets/images/ScarletRomance.jpg';
import SunshineBlissImage from '../assets/images/SunshineBliss.jpg';
import Card from '../components/Card';

const Dashboard = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Scarlet Romance', price: 1200, image: ScarletRomanceImage },
    { id: 2, name: 'Blushing Love', price: 1350, image: BlushingLoveImage },
    { id: 3, name: 'Pure Elegance', price: 1400, image: PureEleganceImage },
    { id: 4, name: 'Sunshine Bliss', price: 1500, image: SunshineBlissImage },
  ]);
  const [user, setUser] = useState(null); // State to store user info
  const navigate = useNavigate(); // For navigating to login page if not authenticated

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser(); // Get the user from Supabase
      if (!user) {
        navigate('/'); // Redirect to the login page if the user is not authenticated
      }
      setUser(user); // Set the authenticated user
    };

    checkAuth(); // Run the check on component mount
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>; // Loading message while checking authentication
  }

  return (
    <div className="card-container">
      {products.map(item => (
        <Card key={item.id} name={item.name} price={item.price} image={item.image} />
      ))}
    </div>
  );
};

export default Dashboard;