import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AppHeader, AppSidebar } from '../../../components'

const DetailMaterial = () => {
  const [material, setMaterial] = useState(null) // Handle material data
  const token = localStorage.getItem('token')

  // Extract the id from route parameters
  const { id } = useParams()

  const handlePrint = () => {
    window.print(); // Trigger the browser print dialog
  };

  // Function to fetch material details
  async function getMaterial() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}user/material/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const fetchedMaterial = res.data.material
      setMaterial(fetchedMaterial)
    } catch (error) {
      console.error('Error fetching material:', error)
    }
  }

  // Fetch material data on component mount
  useEffect(() => {
    getMaterial()
  }, []) // Dependency array ensures this runs only once

  console.log(material)

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
        <div className="text-white" style={{ marginTop: '10px', padding: '10px' }}>
          <div className="d-flex justify-content-between">
            <h1>MATERIAL DETAIL </h1>
            <button className="btn bg-primary no-print" onClick={handlePrint}>
              PRINT
            </button>
          </div>
          {material ? (
            <div style={{ marginTop: '20px' }}>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th><strong>PLANT</strong></th>
                      <th><strong>RST</strong></th>
                      <th style={{width:"150px"}}><strong>VEHICLE NUMBER</strong></th>
                      <th><strong>MATERIAL</strong></th>
                      <th style={{width:"150px"}}><strong>FINAL WEIGHT</strong></th>
                      <th style={{width:"150px"}}><strong>DATE AND TIME</strong></th>
                      <th style={{width:"120px"}}><strong>SUBMITTED BY</strong></th>
                      <th><strong>AUDIO</strong></th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{material.category}</td>
                      <td>{material.rst}</td>
                      <td>{material.vehicle_number}</td>
                      <td>{material.material}</td>
                      <td>{material.final_weight}</td>
                      <td>{new Date(material.created_at).toLocaleString()}</td>
                      <td>{material.created_by}</td>
                      <td>
                        <audio controls src={`${import.meta.env.VITE_BASE_URL}${material.audio}`} style={{width:"150px"}}>
                          THE “AUDIO” TAG IS NOT SUPPORTED BY YOUR BROWSER.
                        </audio>
                      </td>
                     
                    </tr>
                  </tbody>
                </table>
              </div>
              <strong>REMARK</strong>: <p>{material.remark }</p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '20px',
                }}
              >
                {material.vehicle_picture && (
                  <div
                    style={{
                      background: '#333',
                      padding: '10px',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src={`${material.vehicle_picture}`}
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
                {material.weight_picture && (
                  <div
                    style={{
                      background: '#333',
                      padding: '10px',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src={`${material.weight_picture}`}
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
                {material.slip_picture && (
                  <div
                    style={{
                      background: '#333',
                      padding: '10px',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src={`${material.slip_picture}`}
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
            <p>LOADING MATERIAL DETAILS...</p>
          )}
        </div>
      </div>
    </>
  )
}

export default DetailMaterial
