import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CurrencyForm.css';

const CurrencyForm: React.FC = () => {
  const [currencyCode, setCurrencyCode] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // For edit

  useEffect(() => {
    if (id) {
      fetchCurrency(id);
    }
  }, [id]);

  const fetchCurrency = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/currencies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrencyCode(response.data.currency_code);
      setSymbol(response.data.symbol);
    } catch (err) {
      setError('Failed to fetch currency.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { currency_code: currencyCode, symbol };
      if (id) {
        await axios.patch(`http://localhost:3000/api/currencies/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('http://localhost:3000/api/currencies', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      navigate('/currencies');
    } catch (err) {
      setError('Failed to submit currency.');
    }
  };

  return (
    <div className="currency-form-container">
      <h2>{id ? 'Edit Currency' : 'Add New Currency'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="currency-form">
        <div className="form-group">
          <label>Currency Code</label>
          <input
            type="text"
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Symbol</label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update Currency' : 'Add Currency'}
        </button>
      </form>
    </div>
  );
};

export default CurrencyForm;
