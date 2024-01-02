// SignupPage.tsx
import React, { useState } from 'react';
import { createBrowserHistory } from 'history';
import { useNavigate, Link } from 'react-router-dom';
import '../Styling/SignupPage.css';

interface SignupForm {
  SSN: string;
  Fname: string;
  Lname: string;
  gender: string;
  email: string;
  password: string;
  confirmpassword: string;
  date: string;
}

const history = createBrowserHistory();

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupForm>({
    SSN: '',
    Fname: '',
    Lname: '',
    gender: '',
    email: '',
    password: '',
    confirmpassword: '',
    date: '',

  }
  );

  const [errors, setErrors] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors('Invalid email format');
      return;
    }

    // Validate password and confirm password
    if (formData.password !== formData.confirmpassword) {
      setErrors('Password and Confirm Password do not match');
      return;
    }

    // Validate age (assuming you have the birthdate)
    const today = new Date();
    const birthDate = new Date(formData.date);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      setErrors('You must be at least 18 years old to sign up');
      return;
    }

    // Hash the password (you may use a more secure method in production)
    const hashedPassword = formData.password; // Replace with actual hashing logic

    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, password: hashedPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData.message);
        return;
      }

      console.log('Signup form submitted successfully');
      // Redirect to login page upon successful signup
      
      navigate('/');
    } catch (error) {
      console.error('Error submitting signup form:', error.message);
      // Handle other errors, e.g., display an error message to the user
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Signup</h2>
        {errors && <div className="error-message">{errors}</div>}
        <form onSubmit={handleSubmit}>
          <label>
            SSN:
            <input
              type="text"
              name="SSN"
              value={formData.SSN}
              onChange={handleInputChange}
            />
          </label>
          <label>
            First Name:
            <input
              type="text"
              name="Fname"
              value={formData.Fname}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="Lname"
              value={formData.Lname}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
