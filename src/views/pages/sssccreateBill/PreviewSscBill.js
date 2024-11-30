import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './PreviewBill.css';

const PreviewSscBill = () => {
  const [bill, setBill] = useState(null); // State to store the fetched bill
  const { state } = useLocation(); // Retrieve the state from navigation
  const { billId, material, type ,billerName} = state || {}; // Extract billId, material, and type from the state
  const [myBill, setMyBill] = useState('');
  console.log(billerName, 'billerName');

  // Fetch the bill on component mount
  useEffect(() => {
    if (!billId) return; // Ensure billId is available

    const fetchBill = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/get-bill-ssc/${billId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBill(response.data.data);
        setMyBill(response.data.data.counter); // Store the fetched bill data
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
    <>
     <style>
        {`
          @media print {
            body {
              color: black !important;
            }
            table, th, td, p, h1, h2, h3, h4, h5, h6, span {
              color: black !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>
      
    <div className="invoice-card">
      <div className="invoice-title">
        <div className="d-flex justify-content-center">
          <span id="date">{new Date().toLocaleString()}</span> {/* Dynamic date */}
        </div>
        <span id="invoice-number" className='text-dark fw-semibold'>SLIP NUMBER: {myBill || 'N/A'}</span>
      </div>
      
      {/* Show Material and Type information */}
      <div className="invoice-material-type text-dark">
        <p className='text-center'><strong>Category: </strong>{material || 'Not selected'}</p>
        <p className='fs-1 fw-bold text-center'>{type || 'Not selected'}</p>
      </div>
      
      <div className="invoice-details">
        {bill ? (
          <table className="table bg-white" style={{ backgroundColor: 'white' }}>
            <tbody>
             
              <tr>
                <th scope="row" className='fs-4'>RST</th>
                <td  className='fs-4'>{bill.rstno}</td>
              </tr>
              <tr>
                <th scope="row"  className='fs-4'>Vehicle no.</th>
                <td  className='fs-4'>{bill.vehicle_number}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div>No bill available</div>
        )}
        <p className='text-dark fs-4 fw-bold text-center'>SSC</p>
      </div>

      <div className="invoice-footer">
        <button className="btn invoice-btn btn-info no-print" onClick={handlePrint}>
          PRINT
        </button>
      </div>
    </div>
    </>
  );
};

export default PreviewSscBill;
