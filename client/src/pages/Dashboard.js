import React, { useState } from 'react';
import FieldList from '../components/dashboard/FieldList';
import Visualization from '../components/dashboard/Visualization';
import { useNavigate } from 'react-router-dom'; // to handle navigation

const Dashboard = () => {
  const navigate = useNavigate();
  const [showPaymentPage, setShowPaymentPage] = useState(false);

  const handlePaymentClick = () => {
    setShowPaymentPage(true);
    navigate('/dashboard/payment'); // navigate to payment page
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Farmer Dashboard</h1>
      
      {/* Add Payment Button */}
      <div className="mb-6 flex justify-end">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handlePaymentClick}
        >
          Make Payment
        </button>
      </div>

      {/* Show Field List and Visualization */}
      <FieldList />
      <Visualization />

      {/* Conditional Rendering of Payment Page (if you want it within the dashboard) */}
      {showPaymentPage && (
        <div className="payment-section">
          <h2>Payment Page Content</h2>
          {/* Your payment form or UI goes here */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
