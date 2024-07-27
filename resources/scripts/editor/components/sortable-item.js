import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {closeSmall, dragHandle} from '@wordpress/icons';
import {RichText} from '@wordpress/block-editor';
import {Button} from '@wordpress/components';

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
        {fields && (
          <>
            {fields.map((field) => {
              switch (field.type) {
                case 'RichText':
                  return (
                    <RichText
                      key={`${field.name}_${id}`}
                      placeholder={field.placeholder ?? '...'}
                      value={item[field.name]}
                      onChange={(value) => {
                        updateItemContent(id, value, field.name)
                      }}
                    />
                  );
                default:
                  return null;
              }
            })}
          </>
        )}
      </div>
    </li>
  );
}
