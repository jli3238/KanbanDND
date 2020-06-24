import React from 'react';

const Column = props => {
    const drop = e => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData('cardId');
        const card = document.getElementById(cardId);
        card.style.display = 'block';
        e.target.appendChild(card);
    }
    const dragOver = e => { e.preventDefault(); }
    return (<div 
        id={props.id}
        className='column-body'
        onDrop={drop}
        onDragOver={dragOver}>
        { props.children }
    </div>)
}

export default Column;