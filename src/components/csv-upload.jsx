import React, {useState} from 'react';
import Papa from 'papaparse';

export default function CSVUpload(props) {
  const {setParsedProducts} = props;
  const [file, setFile] = useState();

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = csvString => {
    const rawCSV = Papa.parse(csvString, {
      header: true
    });

    const parsedCSV = rawCSV.data.reduce((prev, cur, index) => {
      // @dnd-kit doesn't like {id: 0} for draggables
      cur.id = index + 1;

      if (!cur.category) cur.category = 'Miscellaneous';

      if (prev[cur.category]) {
        prev[cur.category].push(cur);
      } else {
        prev[cur.category] = [cur];
      }

      return prev;
    }, {});

    setParsedProducts(parsedCSV);
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
      <h1>Price Sheet Maker</h1>
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
    </div>
  );
}