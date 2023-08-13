import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import {Product} from './product';

export function SortableProduct(props) {
  const {product} = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: product.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    heigh: 'fit-content',
    width: 'fit-content',
    border: '2px solid black'
  };
  return (
    <Product
      ref={setNodeRef}
      style={style}
      product={product}
      {...attributes}
      {...listeners}
    />
  );
}