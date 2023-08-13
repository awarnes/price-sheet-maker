/* eslint-disable react/display-name */
import React, {forwardRef} from 'react';
import Barcode from 'react-barcode';

export const Product = forwardRef((props, ref) => {
  const {product} = props;

  const style = {
    height: 'fit-content',
    width: 'fit-content',
    border: '2px solid black'
  }
  return (
    <div
      ref={ref}
      style={style}
      {...props}
    >
      <p>{product.name}</p>
      {product.size ? <p>{product.size}</p> : null}
      <p>{product.price}</p>
      <Barcode
        value={product.barcode}
      />
    </div>
  )
});