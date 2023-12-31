// C:\xampp\htdocs\agarly\frontEnd\my-react-app\SignupPage.tsx
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

        <label>
          First Name:
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Last Name:
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Date of Birth:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
