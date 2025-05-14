import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function AddressForm() {

    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    city: '',
    pincode: '603103'
  });

  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);


  const availCities = [
    "Kelambakkam",
    "Navalur",
    "Padur",
    "Pudupakkam",
    "Thaiyur",
    "Egattur",
    "Siruseri",
    "Thazhambur",
    "Kazhipathur",
    "Thalambur",
    "Kanathur",
    "Semmancheri",
    "Ponmar",
    "Ottiyambakkam",
    "Muttukadu",
    "Vaniyanchavadi",
    "Sathankuppam",
    "Sonallur",
    "Senganmal"
  ];

 
const goToPayment=()=>{
    navigate('/process-payment');
}
  
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, mobile, address, city } = formData;

    if (!name || !mobile || !address || !city) {
      setMessage('Please fill in all required fields.');
      return;
    }

    try {
        const res = await axios.post('http://localhost:3000/user-address', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
      setMessage(res.data.message);
      console.log(res.data.createUserDetails);
      setSubmitted(true);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3>User Address Form</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Mobile</label>
          <input type="text" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <textarea name="address" className="form-control" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>City</label>
          <select
            name="city"
            className="form-control"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            {availCities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Pincode (Delivery Available only for this pincode)</label>
          <input type="text" name="pincode" className="form-control" value={formData.pincode} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success" >Add Address</button>
      </form>
      {submitted&&(
        <button className="btn btn-primary mt-3" onClick={goToPayment}>
        Process Payment
      </button>
      )}
    </div>
  );
}

export default AddressForm;