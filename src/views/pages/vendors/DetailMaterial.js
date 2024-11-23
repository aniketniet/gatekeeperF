import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AppHeader, AppSidebar } from '../../../components'

const DetailMaterial = () => {
  const [material, setMaterial] = useState(null) // Handle material data
  const token = localStorage.getItem('token')

  // Extract the id from route parameters
  const { id } = useParams()

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
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="text-white" style={{ marginTop: '10px', padding: '20px' }}>
          <h1>Detail Material</h1>
          {material ? (
            <div style={{ marginTop: '20px' }}>
              {/* Explicitly render fields */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Material:</strong> {material.material}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Remark:</strong> {material.remark}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>RST:</strong> {material.rst}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Vehicle Number:</strong> {material.vehicle_number}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Final Weight:</strong> {material.final_weight}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <audio controls src={`${import.meta.env.VITE_BASE_URL}${material.audio}`}>
                    The “audio” tag is not supported by your browser.
                  </audio>
                </div>
                {/* Add more fields as necessary */}
              </div>

              {/* Explicitly render images */}
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
                      alt="Vehicle Picture"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '150px',
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
                      alt="Weight Picture"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '150px',
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
                      alt="Slip Picture"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '150px',
                        borderRadius: '8px',
                      }}
                    />
                    <p style={{ marginTop: '10px', fontSize: '14px' }}>SLIP PICTURE</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p>Loading material details...</p>
          )}
        </div>
      </div>
    </>
  )
}

export default DetailMaterial
