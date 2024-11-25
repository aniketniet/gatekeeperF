import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './PreviewBill.css';

const PreviewBill = () => {
  const [bill, setBill] = useState(null); // State to store the fetched bill
  const { state } = useLocation(); // Retrieve the state from navigation
  const { billId } = state || {}; // Extract billId

  // Fetch the bill on component mount
  useEffect(() => {
    if (!billId) return; // Ensure billId is available

    const fetchBill = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/get-bill/${billId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBill(response.data.data); // Store the fetched bill data
      } catch (error) {
        console.error('Error fetching bill:', error);
      }
    };

    fetchBill();
  }, [billId]);

  const handlePrint = () => {
    window.print(); // Trigger the browser print dialog
  };

  return (
    <div className="invoice-card">
      <div className="invoice-title">
        <div className='d-flex justify-content-between'>
          <h4 className="text-dark">INVOICE</h4>
          <span id="date">{new Date().toLocaleDateString()}</span> {/* Dynamic date */}
        </div>
        <span id="invoice-number">#{billId || 'N/A'}</span>
      </div>
      <div className="invoice-details">
        {bill ? (
          <table className="table bg-white" style={{ backgroundColor: 'white' }}>
          <tbody className=''>
            <tr>
              <th scope="row">Name</th>
              <td>{bill.name}</td>
            </tr>
            <tr>
              <th scope="row">RTSO</th>
              <td>{bill.rstno}</td>
            
            </tr>
            <tr>
              <th scope="row">Vehicle no.</th>
              <td>{bill.vehicle_number}</td>
             
            </tr>
          </tbody>
        </table>
        ) : (
          <div>No bill available</div>
        )}
      </div>
      <div className="invoice-footer">
        <button className="btn invoice-btn btn-info" onClick={handlePrint}>
          PRINT
        </button>
      </div>
    </div>
  );
};

export default PreviewBill;
