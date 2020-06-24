import React, { useEffect, useState } from 'react';
import Column from './Column';
import Card from './Card';
import './KanbanDND.css';

const KanbanDND = () => {
  const [columns, setColumns] = useState([]);
  const [newCardName, setNewCardName] = useState('');
  const columnsApi = 'data/columns.json';
  useEffect(() => {
      try { fetch(columnsApi)
        .then(response => response.json())
        .then(result => setColumns(result), error => console.log(error));
      } catch (error) { console.log(error); }
  }, []);
  const handleNewCardNameChange = e => {
    let existingCardNames = [];
    for(let i=0; i<columns.length; i++) {
      for(let j=0; j<columns[i].cards.length; j++) {
        existingCardNames.push(columns[i].cards[j].name);
      }
    }
    if (existingCardNames.includes(e.target.value)) return;
    setNewCardName(e.target.value);
  }
  const handleAddNewCard = (columnName) => {
    if (newCardName.trim() === '') return;
    const newCard = {name: newCardName };
    const updatedCards = [...columns.find(column => column.name === columnName).cards, newCard];
    const updatedColumn = {...columns.find(column => column.name === columnName), cards: updatedCards};
    const updatedColumns = columns.map(column => column.name === columnName ? updatedColumn : column);
    setColumns(updatedColumns);
    setNewCardName('');
  }
  return (
    <div className="App">
      <main className='board'>
        { columns.map(column =>
          <div key={column.name} className='column'>
            <h3>{column.name}</h3>
            <input type='text' value={newCardName} onChange={handleNewCardNameChange} placeholder='Enter new card name'/>
            <button onClick={() => handleAddNewCard(column.name)}>+</button>
            <Column id={column.name}>
              {column.cards.map(card =><Card key={card.name} id={card.name}>{card.name}</Card>)}
            </Column>
          </div>
        )}
      </main>
    </div>
  );
}

export default KanbanDND;