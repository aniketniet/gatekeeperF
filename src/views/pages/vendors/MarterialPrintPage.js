import React from 'react'
import { useLocation } from 'react-router-dom'

const MaterialPrintPage = () => {
  const location = useLocation()
  const { materials, type, tableTyle } = location.state || {
    materials: [],
    type: '',
    tableTyle: '',
  }

  // Function to trigger print dialog
  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <style>
        {/* Custom styles */}
        {`
                @media print {
                    body {
                        background-color: white; /* Sets background color for print */
                        color: black; /* Sets text color for print */
                    }

                    .print-hidden {
                        display: none; /* Hides the print button when printing */
                    }
                    .table th,
                    .table td {
                        color: black; /* Sets the color of table headers and cells */
                    }
                }
            `}
      </style>
      <div className="container mt-5">
        <h1 className="text-center " style={{ textTransform: 'uppercase' }}>
          {' '}
          {type} {tableTyle} Details
        </h1>

        {tableTyle === 'material' && materials.length > 0 ? (
          // Full table with all columns for "material"
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>SR NO.</th>

                <th>RST</th>

                <th>VEHICLE NUMBER</th>

                <th>MATERIAL</th>

                <th>FINAL WEIGHT</th>

                <th>DATE & TIME</th>

                <th>SUBMITTED BY</th>

                <th>REMARK</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.rst}</td>
                  <td>{item.vehicle_number}</td>
                  <td>{item.material}</td>
                  <td>{item.final_weight}</td>
                  <td>{item.created_at}</td>
                  <td>{item.created_by}</td>
                  <td>{item.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : tableTyle === 'stone' && materials.length > 0 ? (
          // Second table for "stone" without the 'Material' column
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>SR NO.</th>

                <th>RST</th>

                <th>VEHICLE NUMBER</th>
                <th>FINAL WEIGHT</th>

                <th>DATE & TIME</th>

                <th>SUBMITTED BY</th>

                <th>REMARK</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.rst}</td>
                  <td>{item.vehicle_number}</td>
                  <td>{item.final_weight}</td>
                  <td>{item.created_at}</td>
                  <td>{item.created_by}</td>
                  <td>{item.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : tableTyle === 'extra' && materials.length > 0 ? (
          // Third table for "extra" with only 'SR No.', 'Remark', and 'Date & Time'
          <table className="table table-bordered table-hover mt-3">
            <thead>
              <tr>
                <th>SR NO.</th>
                <th>REMARK</th>
                <th>DATE & TIME</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.remark}</td>
                  <td>{item.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          // Message if none of the conditions are met or materials are empty
          <p>No data available for the selected type.</p>
        )}

        <button className="btn btn-primary mt-3 print-hidden" onClick={handlePrint}>
          Print
        </button>
      </div>
    </>
  )
}

export default MaterialPrintPage
