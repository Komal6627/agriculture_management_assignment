import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FieldForm from './FieldForm';

const FieldList = () => {
  const [fields, setFields] = useState([]);
  const [editingField, setEditingField] = useState(null);
  const [error, setError] = useState('');

  const host = "http://localhost:5000/api";

  // Fetch fields data from the backend
  useEffect(() => {
    const fetchFields = async () => {
      const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
      if (token) {
        try {
          const response = await axios.get(`${host}/field/`, {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token to request header
            },
          });
          setFields(response.data);
        } catch (err) {
          setError('Error fetching fields. Please try again.');
          console.error('Error fetching fields:', err);
        }
      } else {
        setError('User not authenticated');
      }
    };

    fetchFields();
  }, []);

  useEffect(() => {
    console.log("Useeffect", fields)
  }, [fields])

  // Handle delete field
  const handleDelete = async (fieldId) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        await axios.delete(`${host}/field/${fieldId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFields(fields.filter(field => field._id !== fieldId));
      } catch (err) {
        setError('Error deleting field. Please try again.');
        console.error('Error deleting field:', err);
      }
    } else {
      setError('User not authenticated');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Fields</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex space-x-6">
        {/* Field Form */}
        <div className="w-1/3">
          <FieldForm
            fieldData={editingField}
            onSave={(field) => {
              console.log("Filed", field)
              if (editingField) {
                const index = fields.findIndex(item => item._id === field[editingField ? "updatedField" : "field"]._id);


                if (index !== -1) {
                  fields[index] = field[editingField ? "updatedField" : "field"];
                }
                console.log("4", fields);
              } else {
                setFields([field.field, ...fields]); // Add new field to the list
              }
              setEditingField(null); // Reset editing field
            }}
          />
        </div>

        {/* All Fields Section */}
        <div className="w-2/3"> 
          <h3 className="text-xl font-bold mb-4">All Fields</h3>
          {fields.length > 0 ? (
            <ul>
              {fields.map((field) => (
                <li key={field._id} className="bg-gray-100 p-4 rounded mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{field.fieldName}</h4>
                      <p>{field.cropType} - {field.areaSize} hectares</p>
                      <p>Location: {field.location.latitude}, {field.location.longitude}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => setEditingField(field)}
                        className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(field._id)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No fields available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FieldList;
