import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Form from './components/Form';
import Table from './components/Table';

const App = () => {
  return (
    <Router>
      <Routes>
<Route path='/' element={<Form/>}/>
<Route path='/table' element={<Table/>}/>
      </Routes>
    </Router>
  );
};

export default App;
