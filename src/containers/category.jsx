import React from 'react';
import {
  SortableContext,
} from '@dnd-kit/sortable';

import styles from './GridContainer.module.css';
import {SortableProduct} from '../components/sortable-product';

export default function Category(props) {
  const {id, products} = props;

  const columns = 3;

  const style = {
    border: '2px solid black',
    height: 'fit-content',
    width: 'fit-content',
    minHeight: 100,
    minWidth: 100
  };

  return (
    <div style={style}>
      <h1>{id}</h1>

      <ul
        className={styles.GridContainer}
        style={
          {
            '--col-count': columns,
          }
        }
      >
        <SortableContext
          items={products}
          id={id}
        >
          {products.map(product => (
            <SortableProduct
              key={product.id}
              product={product}
            />
          ))}
        </SortableContext>
      </ul>
    </div>
  );
}
