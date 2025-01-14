import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Visualization = () => {
  const [chartData, setChartData] = useState({});
  const [healthMetrics, setHealthMetrics] = useState({});
  const [token, setToken] = useState(''); // Manage the token in the state or get it from localStorage/sessionStorage

  useEffect(() => {
    // Retrieve token from localStorage (or sessionStorage)
    const savedToken = localStorage.getItem('authToken'); // Replace with your method of token storage
    if (savedToken) {
      setToken(savedToken); // Set token if available
    }

    const fetchChartData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ai/analyze', {
          headers: {
            Authorization: `Bearer ${savedToken}`, // Use token in the Authorization header
          },
        });

        const data = response.data.data;

        if (data) {
          // Mapping soilHealth and cropHealth to numeric values
          const healthMap = {
            Healthy: { value: 100, description: 'Good' },
            Average: { value: 75, description: 'Average' },
            Poor: { value: 50, description: 'Poor' },
          };

          const soilHealth = healthMap[data.soilHealth] || { value: 50, description: 'Unknown' };
          const cropHealth = healthMap[data.cropHealth] || { value: 50, description: 'Unknown' };

          const chartData = {
            labels: ['Soil Health', 'Crop Health'],
            datasets: [
              {
                label: 'Health Metrics',
                data: [soilHealth.value, cropHealth.value],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
              },
            ],
          };

          setChartData(chartData);
          setHealthMetrics({
            soilHealth: { ...soilHealth, original: data.soilHealth },
            cropHealth: { ...cropHealth, original: data.cropHealth },
          });
        } else {
          console.error('Invalid data structure: fields not found');
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    if (savedToken) {
      fetchChartData(); // Fetch data if the token exists
    }
  }, [token]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Field Health Visualization</h1>
      {chartData.labels && chartData.datasets ? (
        <>
          <Bar data={chartData} />
          <div className="mt-4 p-4 bg-gray-100 rounded shadow">
            <h2 className="text-lg font-bold mb-2">Health Metrics:</h2>
            <p>
              <strong>Soil Health:</strong> {healthMetrics.soilHealth.value || 'N/A'} ({healthMetrics.soilHealth.description || 'Unknown'}) - {healthMetrics.soilHealth.original || 'N/A'}
            </p>
            <p>
              <strong>Crop Health:</strong> {healthMetrics.cropHealth.value || 'N/A'} ({healthMetrics.cropHealth.description || 'Unknown'}) - {healthMetrics.cropHealth.original || 'N/A'}
            </p>
          </div>
        </>
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default Visualization;
