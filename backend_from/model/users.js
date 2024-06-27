const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    enum: ['Mr', 'Ms', 'Mrs'],
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  businessArena: {
    type: String
  },
  employees: {
    type: String
  },
  street: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: String
  },
  zipCode: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  country: {
    type: String,
    enum: ['US', 'CA', 'UK'],
    required: true
  },
  phoneCode: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  terms: {
    type: Boolean,
    required: true
  }
});

const Form = mongoose.model('Form', formSchema);

exports.Form=Form;