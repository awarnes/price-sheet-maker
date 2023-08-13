import React, {useState} from 'react';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import CSVUpload, {ExampleCsvDownload} from './csv-upload';
import Category from '../containers/category';
import {Product} from './product';
import {Error} from './error';
import { handleDragEnd, handleDragStart } from '../utilities/drag-handlers';

export default function App() {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [parsedProducts, setParsedProducts] = useState({});
  const [activeProduct, setActiveProduct] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div>
      <CSVUpload setParsedProducts={setParsedProducts} setError={setError} />
      <ExampleCsvDownload />
      <Error error={error} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={event => handleDragEnd(event, activeProduct, setParsedProducts, setActiveProduct)}
        onDragStart={event => handleDragStart(event, parsedProducts, setActiveProduct)}
      >
        {
          Object.keys(parsedProducts).map(category => (
            <Category
              key={category}
              id={category}
              products={parsedProducts[category]}
            />
          ))
        }
        <DragOverlay>
          {activeProduct ? (
            <Product product={activeProduct} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}