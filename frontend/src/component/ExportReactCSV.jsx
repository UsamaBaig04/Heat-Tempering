import React from "react";
import { CSVLink } from "react-csv";
import { Button } from "react-bootstrap";

const ExportReactCSV = ({ csvHeaders, csvData, fileName, caption }) => (
  <CSVLink headers={csvHeaders} data={csvData} filename={fileName}>
    <Button variant="secondary"><span >{caption}</span></Button>
  </CSVLink>
);

export default ExportReactCSV;