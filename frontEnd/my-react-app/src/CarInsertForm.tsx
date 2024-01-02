import React, { useState } from 'react';

interface CarInsertForm {
  plate_id: string;
  model: string;
  production_year: string;
  color: string;
  photo: string;
  category: string;
  class_id: string;
  office_id: string;
  status: string;
}

const CarInsertPage: React.FC = () => {
  const [formData, setFormData] = useState<CarInsertForm>({
    plate_id: '',
    model: '',
    production_year: '',
    color: '',
    photo: '',
    category: '',
    class_id: '',
    office_id: '',
    status: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/insertcar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      console.log('Car insertion form submitted successfully');
      // Handle success, e.g., redirect the user or show a success message
    } catch (error) {
      console.error('Error submitting car insertion form:', error.message);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Car Insertion Page</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '10px' }}>
          Plate ID:
          <input
            type="text"
            name="plate_id"
            value={formData.plate_id}
            onChange={handleInputChange}
            style={{ padding: '5px', marginTop: '5px' }}
          />
        </label>

        <label style={{ marginBottom: '10px' }}>
          Model:
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            style={{ padding: '5px', marginTop: '5px' }}
          />
        </label>

        <label style={{ marginBottom: '10px' }}>
          Production Year:
          <input
            type="text"
            name="production_year"
            value={formData.production_year}
            onChange={handleInputChange}
            style={{ padding: '5px', marginTop: '5px' }}
          />
        </label>

        <label style={{ marginBottom: '10px' }}>
          Color:
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            style={{ padding: '5px', marginTop: '5px' }}
          />
        </label>

        <label style={{ marginBottom: '10px' }}>
          Photo:
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleInputChange}
            style={{ padding: '5px', marginTop: '5px' }}
          />
        </label>

        <label style={{ marginBottom: '10px' }}>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            style={{ padding: '5px', marginTop: '5px' }}
          />
        </label>

        <label style={{ marginBottom: '10px' }}>
          Class ID:
          <input
            type="text"
            name="class_id"
            value={formData.class_id}
            onChange={handleInputChange}
            style={{ padding: '5px', marginTop: '5px' }}
          />
        </label>

        <label style={{ marginBottom: '10px' }}>
          Office ID:
          <input
            type="text"
            name="office_id"
            value={formData.office_id}
            onChange={handleInputChange}
            style={{ padding: '5px', marginTop: '5px' }}
          />
        </label>

        <label style={{ marginBottom: '10px' }}>
          Status:
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            style={{ padding: '5px', marginTop: '5px' }}
          />
        </label>

        <button
          type="submit"
          style={{
            marginTop: '15px',
            alignSelf: 'flex-start',
            padding: '10px 15px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Insert Car
        </button>
      </form>
    </div>
  );
};

export default CarInsertPage;