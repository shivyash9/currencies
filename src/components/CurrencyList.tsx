import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CurrencyList.css';

const CurrencyList: React.FC = () => {
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/currencies', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,  
        },
      });
      setCurrencies(response.data);
    } catch (err) {
      setError('Failed to fetch currencies.');
    }
  };

  const handleDeleteCurrency = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/currencies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
      fetchCurrencies();
    } catch (err) {
      setError('Failed to delete currency.');
    }
  };

  return (
    <div className="currency-container">
      <h2>Currency Management</h2>
      {error && <p className="error">{error}</p>}
      <Link to="/currencies/new" className="btn btn-primary">Add New Currency</Link>
      <table className="currency-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Currency Code</th>
            <th>Symbol</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => (
            <tr key={currency.id}>
              <td>{currency.id}</td>
              <td>{currency.currency_code}</td>
              <td>{currency.symbol}</td>
              <td>
                <Link to={`/currencies/edit/${currency.id}`} className="btn btn-secondary">Edit</Link>
                <button onClick={() => handleDeleteCurrency(currency.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyList;
