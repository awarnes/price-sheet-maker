import React, {useState} from 'react';
import CSVTableDisplay from './csv-table-display';
import Papa from 'papaparse';

export default function CSVUpload() {
  const [file, setFile] = useState();
  const [parsedCSV, setParsedCSV] = useState({data: [], meta: {fields: []}});

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = csvString => {
    // const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    // const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    // const array = csvRows.map(i => {
    //   const values = i.split(",");
    //   const obj = csvHeader.reduce((object, header, index) => {
    //     object[header] = values[index];
    //     return object;
    //   }, {});
    //   return obj;
    // });

    const parsedCSV = Papa.parse(csvString, {
      header: true
    })
    console.log("RAW: ", JSON.stringify(parsedCSV))
    setParsedCSV(parsedCSV);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };


  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>

      <br />

      <CSVTableDisplay
        parsedCSV={parsedCSV}
      />
    </div>
  );
}