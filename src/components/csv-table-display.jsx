import React from 'react';

export default function CSVTableDisplay(props) {
  let {parsedCSV} = props;

  return (
    <table>
      <thead>
        <tr key={"header"}>
          {parsedCSV.meta.fields.map((key) => (
            <th>{key}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {parsedCSV.data.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((val) => (
              <td>{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}