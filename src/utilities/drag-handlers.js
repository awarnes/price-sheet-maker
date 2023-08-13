import {arrayMove} from '@dnd-kit/sortable';

export function handleDragStart(event, parsedProducts, setActiveProduct) {
  const {active} = event;
  const activeCategory = active.data.current.sortable.containerId;
  const product = parsedProducts[activeCategory].find(item => item.id === active.id);
  setActiveProduct(product);
}

export function handleDragEnd(event, activeProduct, setParsedProducts, setActiveProduct) {
  const {active, over} = event;

  if (active.id !== over.id) {
    setParsedProducts((items) => {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current.sortable.containerId;

      if (activeContainer === overContainer) {
        const oldIndex = items[activeContainer].map(item => item.id).indexOf(active.id);
        const newIndex = items[activeContainer].map(item => item.id).indexOf(over.id);
        items[activeContainer] = arrayMove(items[activeContainer], oldIndex, newIndex);

        return items;
      }

      activeProduct.category = overContainer;

      items[activeContainer] = items[activeContainer].filter(item => item.id !== activeProduct.id);

      const overIndex = items[overContainer].map(item => item.id).indexOf(over.id);

      items[overContainer].splice(overIndex, 0, activeProduct);

      return items;
    });

    setActiveProduct(null);
  }
}