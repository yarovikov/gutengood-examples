import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {closeSmall, dragHandle, plus} from '@wordpress/icons';
import {Button} from '@wordpress/components';
import {useState} from '@wordpress/element';
import BlockComponents from "@scripts/editor/components/block-components";

export const SortableItem = ({id, item, fields, updateItemContent, deleteItem}) => {

  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <div
      ref={setNodeRef}
      style={style}
      className='flex bg-gray-100'
    >
      <div className='flex flex-col w-10 shrink-0 gap-2 items-center bg-gray-200'>
        <Button
          {...attributes}
          {...listeners}
          icon={dragHandle}
          className='!shadow-none'
        >
        </Button>
        <Button
          icon={isCollapsed ? plus : 'minus'}
          onClick={() => setIsCollapsed(!isCollapsed)}
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
      <div className={`${isCollapsed ? '[&>div]:hidden [&>div:first-child]:block' : ''} flex flex-col gap-4 p-4`}>
        <BlockComponents
          attributes={attributes}
          components={fields}
          onChange={updateItemContent}
          item={item}
          id={id}
        />
      </div>
    </div>
  );
}
