import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './table.css';
import Modal from './Modal';
import {useNavigate } from 'react-router-dom';

const Table = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/form');
        setFormData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id) => {
    const itemToEdit = formData.find((item) => item._id === id);
    setItemToEdit(itemToEdit);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/form/${id}`)
      .then((response) => {
        console.log(`Form data with id ${id} deleted successfully`);
        setFormData(formData.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.error(`Error deleting form data with id ${id}: ${error.message}`);
      });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setItemToEdit(null);
  };

  return (
    
    <div className="table-container">
     <button className='btn-add' onClick={() => navigate("/")}>Add</button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className="table-header">Title</th>
              <th className="table-header">First Name</th>
              <th className="table-header">Last Name</th>
              <th className="table-header">Position</th>
              <th className="table-header">Company</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((item) => (
              <tr key={item._id}>
                <td className="table-cell">{item.title}</td>
                <td className="table-cell">{item.firstName}</td>
                <td className="table-cell">{item.lastName}</td>
                <td className="table-cell">{item.position}</td>
                <td className="table-cell">{item.company}</td>
                <td className="table-cell">
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(item._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
      {modalOpen && itemToEdit && (
        <Modal
          formDataToEdit={itemToEdit}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Table;
