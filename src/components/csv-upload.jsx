import React from 'react';
import Papa from 'papaparse';

const REQUIRED_HEADERS = ['name', 'size', 'price', 'category', 'barcode'];

export default function CSVUpload(props) {
  const {setParsedProducts, setError} = props;

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const csvFileToArray = csvString => {
    const rawCSV = Papa.parse(csvString, {
      header: true
    });

    if (!rawCSV.meta.fields.every(field => REQUIRED_HEADERS.includes(field))) {
      setError('Improperly formatted CSV. Check out the Example above.');
      return;
    }

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
      </form>
    </div>
  );
}

export function ExampleCsvDownload() {
  const url = window.URL.createObjectURL(new Blob([Papa.unparse({
    fields: ['name', 'size', 'price', 'barcode', 'category'],
    data: [
      {
        name: 'Roasted Salted Cashews',
        size: '6 oz bag',
        price: '$7.25',
        barcode: '616316762831',
        category: 'Nuts',
      }
    ]
  })], {type: 'text/plain'}));

  return (
    <div style={{ textAlign: 'center' }}>
      <a href={url} download={'example.csv'}>Download Example</a>
    </div>
  )
}