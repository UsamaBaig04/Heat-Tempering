import React from 'react'
import { IFrame } from './Iframe'

const DempTable = () => {
  return (
    <div>
      <IFrame>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
{/* <style>
  th{
    border:1px solid red;
  }
</style> */}

<table style={{ width: "100%" }} className="table table-striped border-secondary">
  {/* <caption>User Data Table</caption> */}
  <thead style={{ fontSize: "1.2vw", fontFamily: "Arial", borderBottom: "1px solid red", textAlign: "center", backgroundColor: "lightgrey" }} className='sticky-top'>
    <tr style={{}}>
      <th >Date/Time</th>
      <th>VIAL FILLING PDN/FLAF/266(D1)</th>
      <th>VIAL FILLING PDN/FLAF/266(D2)</th>
      <th>VIAL FILLING PDN/FLAF/266(D3)</th>
      <th>VIAL FILLING PDN/FLAF/266(D4)</th>
      <th>VIAL FILLING PDN/FLAF/266(D5)</th>
      <th>VIAL FILLING PDN/FLAF/266(D6)</th>
    </tr>
  </thead>
  <tbody style={{ fontSize: "1.2vw", fontFamily: "Arial", textAlign: "center" }}>
    <tr>
      <td style={{ fontWeight: "bold" }}>Range/unit</td>
      <td>100-180/Pa</td>
      <td>100-180/Pa</td>
      <td>100-180/Pa</td>
      <td>100-180/Pa</td>
      <td>100-180/Pa</td>
      <td>100-180/Pa</td>
    </tr>

    <tr>
      <td>15/02/2023</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
    </tr>
    <tr>
      <td>15/02/2023</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
    </tr>
    <tr>
      <td>15/02/2023</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
    </tr>
    <tr>
      <td>15/02/2023</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
    </tr>
    <tr>
      <td>15/02/2023</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
    </tr>
    <tr>
      <td>15/02/2023</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
    </tr>
    <tr>
      <td>15/02/2023</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
    </tr>
    <tr>
      <td>15/02/2023</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
    </tr>
    <tr>
      <td>15/02/2023</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
    </tr>
    <tr>
      <td>15/02/2023</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
    </tr>
    <tr>
      <td style={{ fontWeight: "bold" }}>Min Value</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
    </tr>
    <tr>
      <td style={{ fontWeight: "bold" }}>Max Value</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
      <td>153</td>
    </tr>


  </tbody>
</table>
</IFrame>
    </div>
  )
}

export default DempTable
