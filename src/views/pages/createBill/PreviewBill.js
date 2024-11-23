import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PreviewBill.css';

const PreviewBill = () => {
  const [bills, setBills] = useState([]);  // State to store fetched bills

  // Fetch bills on component mount
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/get-bills`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBills(response.data.data); // Store the fetched data
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };

    fetchBills();
  }, []);

  const handlePrint = () => {
    window.print(); // Trigger the browser print dialog
  };

  return (
    <div className="invoice-card">
    <div className="invoice-title">
      <div id="main-title">
        <h4 className="text-dark">INVOICE</h4>
        <span id="date">16/02/2019</span>
      </div>
      <span id="invoice-number">#89 292</span>
    </div>
    <div className="invoice-details">
      {bills.length > 0 ? (
        bills.map((bill) => (
          <div key={bill.id} className="invoice-line">
            <div className="line-item">
              <strong>ID:</strong> {bill.id}
            </div>
            <div className="line-item">
              <strong>RTO:</strong> {bill.rto}
            </div>
            <div className="line-item">
              <strong>Vehicle Number:</strong> {bill.vehicle_number}
            </div>
            <div className="line-item">
              <strong>Name:</strong> {bill.name}
            </div>
            <hr />
          </div>
        ))
      ) : (
        <div>No bills available</div>
      )}
    </div>
    <div className="invoice-footer">
      <button className="btn invoice-btn btn-info" onClick={handlePrint}>PRINT</button>
    </div>
  </div>
  
  );
};

export default PreviewBill;
