// #region IMPORTS -> /////////////////////////////////////
import React, { useState } from 'react'
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Pro () {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const content = formDataToUrlEncoded(form);
        try {
          const response = await fetch('http://localhost:8000/test-form', {
            method: 'POST',
            body: content,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
          });
          const result = await response.json();
          console.log('Success:', result);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" onChange={handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      );
    
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
const formDataToUrlEncoded = (formData) => {
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, value);
    });
    return params.toString();
  };
// #enderegion IPROPS --> //////////////////////////////////