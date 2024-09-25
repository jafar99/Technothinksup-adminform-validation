import React, { useState } from 'react';
import './AdminForm.css'; 

const AdminForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    phone: '',
    newsletter: false,
  });

  const [errors, setErrors] = useState({}); 
  const [showPopup, setShowPopup] = useState(false); 

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone) => {
    const phonePattern = /^[0-9]{10}$/; 
    return phonePattern.test(phone);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordPattern.test(password); 
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email || !validateEmail(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.password || !validatePassword(formData.password)) newErrors.password = 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number';
    if (!formData.phone || !validatePhone(formData.phone)) newErrors.phone = 'Phone number must be 10 digits long';
    if (!formData.role) newErrors.role = 'Please select a role';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data:', formData);
      setShowPopup(true); 
      setFormData({
        username: '',
        email: '',
        password: '',
        role: '',
        phone: '',
        newsletter: false,
      });
    }
  };

  const closePopup = () => {
    setShowPopup(false); 
  };

  return (
    <div>
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>Admin User Form</h2>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {errors.username && <p className="error">{errors.username}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <label htmlFor="role">Role</label>
        <select name="role" id="role" value={formData.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
        {errors.role && <p className="error">{errors.role}</p>}

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="newsletter"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
          />
          <label htmlFor="newsletter">Subscribe to Newsletter</label>
        </div>

        <button type="submit">Submit</button>
      </form>

     
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Form Submitted</h3>
            <p>Your form has been successfully submitted.</p>
            <button className="close-btn" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminForm;
