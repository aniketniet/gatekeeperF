import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './PreviewBill.css';

const PreviewBill = () => {
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
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/get-bill-bsc/${billId}`, {
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
              width:305px;
            
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
               
              width: 100%;
              
                

            
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
          <span id="date" className='fs-5'>{new Date().toLocaleString()}</span> {/* Dynamic date */}
        </div>
        <span id="invoice-number" className='text-dark fw-semibold'>SLIP NUMBER: {myBill || 'N/A'}</span>
      </div>
      
      {/* Show Material and Type information */}
      <div className="invoice-material-type text-dark">
        
        <p className='fw-bold text-center' style={{fontSize:'50px'}}>{type || 'Not selected'}</p>
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
                <th scope="row"  className='fs-4'>VEHICLE NO.</th>
                <td  className='fs-4'>{bill.vehicle_number}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div>No bill available</div>
        )}
        <p className='text-dark fs-4 fw-bold text-center'>B.S.C.</p>
           <p className='text-center text-black'><strong>REMARK: </strong>{material || 'Not selected'}</p>
      </div>

      <div className='d-flex justify-content-between align-items-center mt-2'>
        <button className="btn invoice-btn btn-info no-print text-white fw-semibold" onClick={handlePrint}>
          PRINT
        </button>

        <Link to="/createbill">
        <button className="btn invoice-btn btn-info no-print text-white fw-semibold">
          HOME
        </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default PreviewBill;
