import {useEffect, useState} from "react";
import {closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {SortableItem} from "@scripts/editor/components/sortable-item";
import {Button} from '@wordpress/components';

export const SortableList = ({fields, props}) => {

  const {
    attributes,
    setAttributes,
  } = props;

  const {items = []} = attributes;
  const [sortableItems, setSortableItems] = useState(items);

  useEffect(() => {
    setSortableItems(items);
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const moveItem = (activeId, overId) => {
    const activeIndex = sortableItems.findIndex((item) => item.id === activeId);
    const overIndex = sortableItems.findIndex((item) => item.id === overId);

    if (activeIndex !== overIndex) {
      const newItems = arrayMove(sortableItems, activeIndex, overIndex);
      setSortableItems(newItems);
      setAttributes({items: newItems});
    }
  };

  const addItem = (fields) => {
    const newItem = {
      id: `${Date.now()}`,
    };
    fields.forEach(field => {
      newItem[field.name] = field.value;
    });

    const newItems = [...sortableItems, newItem];
    setSortableItems(newItems);
    setAttributes({items: newItems});
  };

  const deleteItem = (id) => {
    const newItems = sortableItems.filter((item) => item.id !== id);
    setSortableItems(newItems);
    setAttributes({items: newItems});
  };

  const updateItemContent = (id, value, t) => {
    const newItems = sortableItems.map((item) =>
      item.id === id ? {...item, [t]: value} : item
    );
    setSortableItems(newItems);
    setAttributes({items: newItems});
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
          const {active, over} = event;
          if (active && over) {
            moveItem(active.id, over.id);
          }
        }}
      >
        <SortableContext
          items={sortableItems}
          strategy={verticalListSortingStrategy}
        >
          <ul className='flex flex-col gap-4'>
            {sortableItems.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                item={item}
                fields={fields}
                updateItemContent={updateItemContent}
                deleteItem={deleteItem}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <Button
        isPrimary
        onClick={() => addItem(fields)}
        className='block mx-auto mt-10'
      >
        Добавить
      </Button>
    </div>
  );
}
