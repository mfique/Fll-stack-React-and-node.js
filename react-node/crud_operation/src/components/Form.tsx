import React, { useState } from 'react';
import axios from 'axios';
import './form.css'
import { ChangeEvent } from 'react';
import { FormEvent } from 'react'
import { Link, useNavigate } from "react-router-dom";


const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    position: '',
    company: '',
    businessArena: '',
    employees: '',
    street: '',
    additionalInfo: '',
    zipCode: '',
    place: '',
    country: '',
    phoneCode: '',
    phoneNumber: '',
    email: '',
    terms: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/form', formData);
      console.log(response.data.message);
      navigate("/table");
   
      // Handle successful form submission (e.g., display a success message, clear the form, etc.)
    } catch (error) {
      console.error('Error submitting form', error);
      // Handle error (e.g., display an error message)
    
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-section general-info">
          <h2>General Information</h2>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <select id="title" name="title" value={formData.title} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
            </select>
          </div>
          <div className="names">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} />
          </div>
          <div className="empl">
            <div className="form-group">
              <label htmlFor="businessArena">Business Arena</label>
              <input type="text" id="businessArena" name="businessArena" value={formData.businessArena} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="employees">Employees</label>
              <input type="text" id="employees" name="employees" value={formData.employees} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="form-section contact-details">
          <h2>Contact Details</h2>
          <div className="form-group">
            <label htmlFor="street">Street + Nr</label>
            <input type="text" id="street" name="street" value={formData.street} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="additionalInfo">Additional Information</label>
            <input type="text" id="additionalInfo" name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} />
          </div>
          <div className="plac">
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code</label>
              <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="place">Place</label>
              <input type="text" id="place" name="place" value={formData.place} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select id="country" name="country" value={formData.country} onChange={handleChange}>
              <option value="">Select</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
            </select>
          </div>
          <div className="codeno">
            <div className="form-group">
              <label htmlFor="phoneCode">Code +</label>
              <input type="text" id="phoneCode" name="phoneCode" value={formData.phoneCode} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="terms">
            <label htmlFor="terms">
              <span>
                <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} />
              </span>
              I do accept the <a href="#">Terms and Conditions</a> of your site.
            </label>
          </div>
          <button type="submit">Register Badge</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
