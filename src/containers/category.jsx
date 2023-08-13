import React from 'react';
import {
  SortableContext,
} from '@dnd-kit/sortable';

import styles from './GridContainer.module.css';
import {SortableProduct} from '../components/sortable-product';

export default function Category(props) {
  const {id, products} = props;

  const columns = 5;

  return (
    <div>
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
