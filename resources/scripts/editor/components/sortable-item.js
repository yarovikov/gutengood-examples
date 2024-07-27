import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {closeSmall, dragHandle} from '@wordpress/icons';
import {Button} from '@wordpress/components';
import BlockComponents from "@scripts/editor/components/block-components";

export const SortableItem = ({id, item, fields, updateItemContent, deleteItem}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id});

  const style = {
    transform: CSS.Transform.toString(transform && {...transform, scaleY: 1}),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className='flex flex-col gap-2'
    >
      <div className='flex gap-2 items-center justify-between bg-black/5'>
        <Button
          {...attributes}
          {...listeners}
          icon={dragHandle}
          className='!shadow-none'
        >
        </Button>
        <Button
          isDestructive
          onClick={() => deleteItem(id)}
          icon={closeSmall}
          className='!shadow-none'
        >
        </Button>
      </div>
      <div className='flex flex-col gap-4'>
        <BlockComponents
          attributes={attributes}
          components={fields}
          onChange={updateItemContent}
          item={item}
          id={id}
        />
      </div>
    </li>
  );
}
