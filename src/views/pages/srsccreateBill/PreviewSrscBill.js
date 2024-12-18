import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './PreviewBill.css';

const PreviewSrscBill = () => {
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
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/get-bill-srsc/${billId}`, {
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
            @page {
              size: A4;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              color: black !important;
            }
            .invoice-card {
              
              top: 20%;
              left: 50%;
            
            }
            table, th, td, p, h1, h2, h3, h4, h5, h6, span {
              color: black !important;
              text-align: center !important; 
              font-weight: 900 !important; 
              font-size: 2rem; 
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
          <p id="date" className='fs-4'>{new Date().toLocaleString()}</p> {/* Dynamic date */}
        </div>
        <p id="invoice-number" >SLIP NUMBER: {myBill || 'N/A'}</p>
      </div>
      
      {/* Show Material and Type information */}
      <div className="invoice-material-type">
       
        <p>{type || 'Not selected'}</p>
      </div>
      
      <div className="invoice-details">
        {bill ? (
          <table className="table bg-white" style={{ backgroundColor: 'white' }}>
            <tbody>
             
              <tr>
                <th scope="row" className='fs-4'>RST 1.</th>
                <td  className='fs-4'>{bill.rstno}</td>
              </tr>
              <tr>
                <th scope="row"  className='fs-4'>VEHICLE NO.</th>
                <td  className='fs-4'>{bill.vehicle_number}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div>No bill available</div>
        )}
        <p>S.R.S.C.</p>
        <p style={{fontSize:"1rem"}}>REMARK:{material || 'Not selected'}</p>
      </div>

      
      <div className='d-flex justify-content-between align-items-center mt-2'>
        <button className="btn invoice-btn btn-info no-print text-white fw-semibold" onClick={handlePrint}>
          PRINT
        </button>

        <Link to="/createsrscbill">
        <button className="btn invoice-btn btn-info no-print text-white fw-semibold">
          HOME
        </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default PreviewSrscBill;
