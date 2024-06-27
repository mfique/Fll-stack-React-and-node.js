import React, { useState } from 'react';
import axios from 'axios';
import './modal.css'  

interface FormDataToEdit {
  _id: string;
  title: string;
  firstName: string;
  lastName: string;
  position: string;
  company: string;
}

interface ModalProps {
  formDataToEdit: FormDataToEdit;
  onClose: () => void;
}

const Modal = ({ formDataToEdit, onClose }: ModalProps) => {
  const [title, setTitle] = useState(formDataToEdit.title);
  const [firstName, setFirstName] = useState(formDataToEdit.firstName);
  const [lastName, setLastName] = useState(formDataToEdit.lastName);
  const [position, setPosition] = useState(formDataToEdit.position);
  const [company, setCompany] = useState(formDataToEdit.company);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.patch(`http://localhost:5000/api/form/${formDataToEdit._id}`, {
      title,
      firstName,
      lastName,
      position,
      company,
    })
      .then((response) => {
        console.log(`Form data with id ${formDataToEdit._id} updated successfully`);
        onClose();
        setError(null);
      })
      .catch((error) => {
        console.error(`Error updating form data with id ${formDataToEdit._id}: ${error.message}`);
        setError(error.message);
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Form Data</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter title"
            />
          </label>
          <br />
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Enter first name"
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Enter last name"
            />
          </label>
          <br />
          <label>
            Position:
            <input
              type="text"
              value={position}
              onChange={(event) => setPosition(event.target.value)}
              placeholder="Enter position"
            />
          </label>
          <br />
          <label>
            Company:
            <input
              type="text"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder="Enter company"
            />
          </label>
          <br />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
