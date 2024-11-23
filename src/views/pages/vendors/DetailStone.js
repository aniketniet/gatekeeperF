import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AppHeader, AppSidebar } from '../../../components'

const DetailStone = () => {
  const [Stone, setStone] = useState(null) // Handle Stone data
  const token = localStorage.getItem('token')

  // Extract the id from route parameters
  const { id } = useParams()

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
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="text-white" style={{ marginTop: '10px', padding: '20px' }}>
          <h1>Detail Stone</h1>
          {Stone ? (
            <div style={{ marginTop: '20px' }}>
              {/* Display specific fields */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Remark:</strong> {Stone.remark}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>RST:</strong> {Stone.rst}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Final weight:</strong> {Stone.final_weight} kg
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Vehicle Number:</strong> {Stone.vehicle_number}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <audio controls src={`${import.meta.env.VITE_BASE_URL}${Stone.audio}`}>
                    The “audio” tag is not supported by your browser.
                  </audio>
                </div>
                {/* Add more fields as necessary */}
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
                      height: '200px',
                      padding: '10px',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src={`${Stone.vehicle_picture}`}
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
            <p>Loading Stone details...</p>
          )}
        </div>
      </div>
    </>
  )
}

export default DetailStone
