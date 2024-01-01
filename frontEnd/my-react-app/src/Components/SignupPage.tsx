// SignupPage.tsx
import React, { useState } from 'react';

interface SignupForm {
  ssn: string;
  fname: string;
  lname: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  date: string;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<SignupForm>({
    ssn: '',
    fname: '',
    lname: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    date: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/signup', {
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

      console.log('Signup form submitted successfully');
      // Handle success, e.g., redirect the user or show a success message
    } catch (error) {
      console.error('Error submitting signup form:', error.message);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <div>
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          SSN:
          <input
            type="text"
            name="ssn"
            value={formData.ssn}
            onChange={handleInputChange}
          />
        </label>
        <br />

        {/* Add the rest of the form fields similar to the above example */}
        {/* ... */}

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
