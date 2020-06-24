import React from 'react';

const Card = props => {
    const dragStart = e => {
        const { target } = e;
        e.dataTransfer.setData('cardId', target.id);
        setTimeout(() => { target.style.display = 'none';  }, 0)
    }
    const dragOver = e => { e.stopPropagation(); }
    return (<div 
        id={props.id}
        className='card'
        draggable={true}
        onDragStart={dragStart}
        onDragOver={dragOver}>
        { props.children }
    </div>)
}

export default Card;