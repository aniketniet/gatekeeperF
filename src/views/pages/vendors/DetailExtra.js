import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AppHeader, AppSidebar } from '../../../components'

const DetailExtra = () => {
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
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}user/extra/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const fetchedStone = res.data.extra
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
            <h1 className='fs-1 fw-bold text-black'>DETAIL EXTRA</h1>
            <button className="btn bg-primary no-print text-white fw-bold" onClick={handlePrint}>
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
                      <th><strong>REMARK</strong></th>
                      <th><strong>SUBMITTED BY</strong></th>
                      <th><strong>AUDIO</strong></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{Stone.remark}</td>
                      <td>{Stone.created_by}</td>
                      <td>
                        <audio controls src={`${import.meta.env.VITE_BASE_URL}${Stone.audio}`}>
                          THE “AUDIO” TAG IS NOT SUPPORTED BY YOUR BROWSER.
                        </audio>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

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
                      maxWidth: '300px',
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
                        maxHeight: '300px',
                        borderRadius: '8px',
                      }}
                    />
                    <p style={{ marginTop: '10px', fontSize: '14px' }}>VEHICLE PICTURE</p>
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

export default DetailExtra
