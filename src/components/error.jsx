import React from 'react';

export function Error(props) {
  const {error} = props;

  const style = {
    textAlignment: 'center',
    color: 'red'
  }

  return error && (
    <div style={style}>
      <h1>{error}</h1>
    </div>
  )
}