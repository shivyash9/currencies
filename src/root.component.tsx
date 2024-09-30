import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CurrencyList from './components/CurrencyList';
import CurrencyForm from './components/CurrencyForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/currencies" element={<CurrencyList />} />
        <Route path="/currencies/new" element={<CurrencyForm />} />
        <Route path="/currencies/edit/:id" element={<CurrencyForm />} />
      </Routes>
    </Router>
  );
};

export default App;
