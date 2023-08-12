import React from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {SortableProduct} from '../components/sortable-product';

export default function Category(props) {
  const {id, products} = props;
  return (
    <SortableContext
      items={products}
      strategy={verticalListSortingStrategy}
      id={id}
    >
      <h1>{id}</h1>
      {products.map(product => <SortableProduct key={product.id} product={product} />)}
    </SortableContext>
  );
}