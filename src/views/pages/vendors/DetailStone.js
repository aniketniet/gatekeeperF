import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AppHeader, AppSidebar } from '../../../components'

const DetailStone = () => {
  const [Stone, setStone] = useState(null) // Handle Stone data
  const token = localStorage.getItem('token')

  // Extract the id from route parameters
  const { id } = useParams()

  const handlePrint = () => {
    window.print(); // Trigger the browser print dialog
  };

  // Function to fetch Stone details
  async function getStone() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}user/stone/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const fetchedStone = res.data.stone
      setStone(fetchedStone)
    } catch (error) {
      console.error('Error fetching Stone:', error)
    }
  }

  // Fetch Stone data on component mount
  useEffect(() => {
    getStone()
  }, []) // Dependency array ensures this runs only once

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
      
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="text-white" style={{ marginTop: '10px', padding: '20px' }}>
          <div className="d-flex justify-content-between">
            <h1>STONE DETAIL </h1>
            <button className="btn bg-primary px-3 no-print" onClick={handlePrint}>
              PRINT
            </button>
          </div>

          {Stone ? (
            <div style={{ marginTop: '20px' }}>
              {/* Responsive Table */}
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                    
                    <th><strong>PLANT</strong></th>
                      <th><strong>RST</strong></th>
                      <th style={{width:"150px"}}><strong>VEHICLE NUMBER</strong></th>
                      <th style={{width:"150px"}}><strong>FINAL WEIGHT</strong></th>
                      <th style={{width:"150px"}}><strong>DATE AND TIME</strong></th>
                      <th style={{width:"120px"}}><strong>SUBMITTED BY</strong></th>
                      <th><strong>AUDIO</strong></th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                    <td>{Stone.category}</td>
                      <td>{Stone.rst}</td>
                      <td>{Stone.vehicle_number}</td>
                      <td>{Stone.final_weight} KG</td>
                      <td>{new Date(Stone.created_at).toLocaleString()}</td>
                      <td>{Stone.created_by}</td>
                    
                      <td>
                        <audio controls src={`${import.meta.env.VITE_BASE_URL}${Stone.audio}`} style={{width:"150px"}}>
                          THE “AUDIO” TAG IS NOT SUPPORTED BY YOUR BROWSER.
                        </audio>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <strong>REMARK</strong>: <p>{Stone.remark}</p>

              {/* Display images */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '20px',
                }}
              >
                {Stone.vehicle_picture && (
                  <div
                    style={{
                      background: '#333',
                      height: '200px',
                      padding: '10px',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src={`${Stone.vehicle_picture}`}
                      alt="VEHICLE PICTURE"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        borderRadius: '8px',
                      }}
                    />
                    <p style={{ marginTop: '10px', fontSize: '14px' }}>VEHICLE PICTURE</p>
                  </div>
                )}
                {Stone.weight_picture && (
                  <div
                    style={{
                      background: '#333',
                      padding: '10px',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src={`${Stone.weight_picture}`}
                      alt="WEIGHT PICTURE"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        borderRadius: '8px',
                      }}
                    />
                    <p style={{ marginTop: '10px', fontSize: '14px' }}>WEIGHT PICTURE</p>
                  </div>
                )}
                {Stone.slip_picture && (
                  <div
                    style={{
                      background: '#333',
                      padding: '10px',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src={`${Stone.slip_picture}`}
                      alt="SLIP PICTURE"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        borderRadius: '8px',
                      }}
                    />
                    <p style={{ marginTop: '10px', fontSize: '14px' }}>SLIP PICTURE</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p>LOADING STONE DETAILS...</p>
          )}
        </div>
      </div>
    </>
  )
}

export default DetailStone
