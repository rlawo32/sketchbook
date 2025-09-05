'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities';

const Item = (props: {id:number, idx:number, lv:number, nm:string}) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        width: '50px',
        padding: '5px 8px',
        margin: '26px 0',
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'grab',
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} >
            {props.nm} / {props.id}
        </div>
    )
}

export default Item;
