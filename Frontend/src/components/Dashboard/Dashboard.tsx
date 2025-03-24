import React, { useEffect, useState } from 'react';

// Define the structure of the expected API response
interface DashboardData {
  item_active: number;
  item_inactive: number;
}

const Dashboard: React.FC = () => {
  // Explicitly set types for state variables
  const [activeCount, setActiveCount] = useState<number>(0);
  const [inactiveCount, setInactiveCount] = useState<number>(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('#');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: DashboardData = await response.json(); // Type-casting API response
        setActiveCount(data.item_active);
        setInactiveCount(data.item_inactive);
      } catch (error) {
        console.error('Error fetching item dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []); // Runs only on component mount

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="flex justify-center gap-8">
        <div className="w-40 h-40 bg-green-100 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-green-600">Active Items</h2>
          <p className="text-3xl font-bold text-green-800">{activeCount}</p>
        </div>
        <div className="w-40 h-40 bg-red-100 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-red-600">Inactive Items</h2>
          <p className="text-3xl font-bold text-red-800">{inactiveCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
