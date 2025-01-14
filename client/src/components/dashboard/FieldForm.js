import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FieldForm = ({ fieldData, onSave }) => {
  const [formData, setFormData] = useState({
    fieldName: '',
    location: { latitude: '', longitude: '' },
    cropType: '',
    areaSize: '',
  });

  const host = 'http://localhost:5000/api';
  const token = localStorage.getItem('authToken');  // Get token from localStorage

  // Update form data when fieldData prop changes (for editing)
  useEffect(() => {
    if (fieldData) {
      setFormData({
        ...fieldData,
        location: fieldData.location || { latitude: '', longitude: '' },
      });
    }
  }, [fieldData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error('Authorization token is missing');
      return;
    }
    // console.log("1",fieldData, fieldData._id, formData);
    
    try {
      const response = fieldData
        ? await axios.put(
            `${host}/field/${fieldData._id}`,  // Correct endpoint for updating
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ) // Update existing field
        : await axios.post(
            `${host}/field/`,  // Correct endpoint for creating new field
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ); // Create new field
console.log("2",response.data);

      onSave(response.data);  // Notify parent component about the save
      
    } catch (err) {
      if (err.response) {
        console.error('Error response:', err.response.data);
        alert(`Error: ${err.response.data.message}`);
      } else {
        console.error('Error:', err);
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-96">
      <h2 className="text-xl font-bold mb-4">{fieldData ? 'Edit Field' : 'Add Field'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Field Name"
          value={formData.fieldName}
          onChange={(e) =>
            setFormData({ ...formData, fieldName: e.target.value })
          }
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <div className="flex space-x-4 mb-4">
          <input
            type="number"
            placeholder="Latitude"
            value={formData.location.latitude}  
            onChange={(e) =>
              setFormData({
                ...formData,
                location: { ...formData.location, latitude: e.target.value },
              })
            }
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="number"
            placeholder="Longitude"
            value={formData.location.longitude}  
            onChange={(e) =>
              setFormData({
                ...formData,
                location: { ...formData.location, longitude: e.target.value },
              })
            }
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <input
          type="text"
          placeholder="Crop Type"
          value={formData.cropType}
          onChange={(e) =>
            setFormData({ ...formData, cropType: e.target.value })
          }
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="number"
          placeholder="Area Size (in hectares)"
          value={formData.areaSize}
          onChange={(e) =>
            setFormData({ ...formData, areaSize: e.target.value })
          }
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 transition"
        >
          {fieldData ? 'Save Changes' : 'Add Field'}
        </button>
      </form>
    </div>
  );
};

export default FieldForm;
