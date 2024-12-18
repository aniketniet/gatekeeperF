import React from 'react'
import { useLocation } from 'react-router-dom'

const MaterialPrintPage = () => {
  const location = useLocation()
  const { materials, type, tableTyle,} = location.state || {
    
    materials: [],
    type: '',
    tableTyle: '',
    
    
  }

  const filteredMaterials = materials.filter(item => item.status === 1);

  // Function to trigger print dialog
  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <style>
        {/* Custom styles */}
        <style>
  {`
    @media print {
      body {
        background-color: white; /* Background color for print */
        color: black; /* Text color for print */
        margin: 0; /* Remove margins for print */
      }

      .print-hidden {
        display: none; /* Hide print button when printing */
      }

      .container {
        max-width: 100%; /* Ensures it doesn't overflow */
        width: 100%;
        padding: 0 10mm; /* Adds some padding for readability */
      }

      .table {
        width: 100%; /* Ensure table fits within page width */
        border-collapse: collapse; /* Collapse table borders for clean look */
      }

      .table th,
      .table td {
        color: black; /* Text color for table */
        border: 1px solid black; /* Ensure borders are visible */
        padding: 3px; /* Add padding for readability */
        word-break: break-word; /* Prevent text overflow */
        font-size: 13px; /* Adjust font size for readability */
      }
    }
  `}
</style>

      </style>
      <div className="container mt-5">
        <h1 className="text-center " style={{ textTransform: 'uppercase' }}>
          {' '}
          {type}  {tableTyle} Details
        </h1>

        {tableTyle === 'material' && materials.length > 0 ? (
          // Full table with all columns for "material"
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>SR NO.</th>

                <th>RST 1.</th>

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

                <th>RST 1.</th>

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
        ) :
        tableTyle === 'Slip' &&  filteredMaterials.length > 0 ? (
          // Second table for "stone" without the 'Material' column
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>SR NO.</th>
                <th>DATE & TIME</th>
                <th>RST 1.</th>
                <th>VEHICLE NO.</th>
                {/* <th>BILL ID</th> */}
                <th>SLIP NO.</th>
                <th>REMARK</th>
              </tr>
            </thead>
            <tbody>
              {filteredMaterials.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {/* <td>{new Date(item.createdAt).toLocaleDateString('en-GB')}</td> */}
                  <td>
                    {(() => {
                      const date = new Date(item.createdAt);
                      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
                      const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
                      return `${formattedDate} ${formattedTime}`;
                    })()}
                  </td>
                  <td>{item.rstno}</td>
                  <td>{item.vehicle_number}</td>
                  {/* <td>{item.bill_id}</td> */}
                  <td>{item.counter}</td>
                 
                  <td>{item.material}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ):
        tableTyle === 'Slips' &&  materials.length > 0 ? (
          // Second table for "stone" without the 'Material' column
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>SR NO.</th>
                <th>DATE & TIME</th>
                <th>RST 1.</th>
                <th>VEHICLE NO.</th>
                {/* <th>BILL ID</th> */}
                <th>SLIP NO.</th>
                <th>REMARK</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {/* <td>{new Date(item.createdAt).toLocaleDateString('en-GB')}</td> */}
                  <td>
                    {(() => {
                      const date = new Date(item.createdAt);
                      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
                      const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
                      return `${formattedDate} ${formattedTime}`;
                    })()}
                  </td>
                  <td>{item.rstno}</td>
                  <td>{item.vehicle_number}</td>
                  {/* <td>{item.bill_id}</td> */}
                  <td>{item.counter}</td>
                 
                  <td>{item.material}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ):
         (
          // Message if none of the conditions are met or materials are empty
          <p className='text-white'>No data available for the selected type.</p>
        )}

        <button className="btn btn-primary mt-3 print-hidden" onClick={handlePrint}>
          Print
        </button>
      </div>
    </>
  )
}

export default MaterialPrintPage
