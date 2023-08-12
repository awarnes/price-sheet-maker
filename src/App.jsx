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

import './App.css';
import CSVUpload from './components/csv-upload';
import Category from './containers/category';
import {Product} from './components/product';
import { handleDragEnd, handleDragStart } from './utilities/dragging';

function App() {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [parsedProducts, setParsedProducts] = useState({});
  const [activeProduct, setActiveProduct] = useState(null);

  const style = {
    border: '2px solid black',
    minHeight: 100,
    minWidth: 100
  };

  return (
    <div>
      <CSVUpload setParsedProducts={setParsedProducts} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={event => handleDragEnd(event, activeProduct, setParsedProducts, setActiveProduct)}
        onDragStart={event => handleDragStart(event, parsedProducts, setActiveProduct)}
      >
        {
          Object.keys(parsedProducts).map(category => (
            <div style={style}>
              <Category
                key={category}
                id={category}
                products={parsedProducts[category]}
              />
            </div>
          ))
        }
        <DragOverlay>
          {activeProduct ? (
            <Product product={activeProduct} />
          ): null}
        </DragOverlay>
      </DndContext>
    </div>

  );
}

export default App;
