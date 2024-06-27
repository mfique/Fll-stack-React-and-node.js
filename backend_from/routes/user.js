const express = require('express');
const { Form } = require('../model/users'); // Change 'users' to 'Form'
const router = express.Router();

router.get('/', async (req, res) => {
  const forms = await Form.find().sort('firstName'); // Change 'FirstName' to 'firstName'
  res.send(forms);
});

router.get('/:id', async (req, res) => {
  const form = await Form.findById(req.params.id);
  if (!form) return res.status(404).send('The form with the given Id was not found');
  res.send(form);
});

router.post('/', async (req, res) => {
  let form = new Form(req.body); // Remove _.pick()
  await form.save();
  res.send(form);
});

router.put('/:id', async (req, res) => {
  const form = await Form.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    position:req.body.position,
    company:req.body.company
  
  }, { new: true });
  if (!form) return res.status(404).send('The form with the given id was not found');
  await form.save();
  res.send(form);
});

router.delete('/:id', async (req, res) => {
  const form = await Form.findByIdAndDelete(req.params.id);
  if (!form) return res.status(404).send('The form with the given id was not found');
  res.send(form);
});

module.exports = router;