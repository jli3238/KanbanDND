import React, { useEffect, useState } from 'react';
import Column from '../src/Column';
import Card from '../src/Card';
import './index.css';

const App = () => {
  const [columns, setColumns] = useState([]);
  const [newCardName, setNewCardName] = useState('');
  const columnsApi = 'data/columns.json';
  useEffect(() => {
      try {
          fetch(columnsApi)
              .then(response => response.json())
              .then(
                  result => setColumns(result),
                  error => console.log(error));
      } catch (error) { console.log(error); }
  }, []);
  const handleNewCardNameChange = (e) => {
    const { target } = e;
    if (target.value.trim() ==='') return;
    setNewCardName(target.value.trim());
  }
  const handleAddNewCard = (columnId) => {
    if (newCardName.trim() ==='') return;
    const cardId = columns.find(column =>column.id === columnId).cards.length;
    const newCard = {id: cardId, name: newCardName };
    const updatedCards = [...columns.find(column => column.id === columnId).cards, newCard];
    const updatedColumn = {...columns.find(column => column.id === columnId), cards: updatedCards};
    const updatedColumns = columns.map(column => column.id === columnId ? updatedColumn : column);
    setColumns(updatedColumns);
    setNewCardName('');
  }
  return (
    <div className="App">
      <main className='board'>
        { columns.map(column =>
          <div className='column'>
            <h3>{column.name}</h3>
            <input type='text' value={newCardName} onChange={e => handleNewCardNameChange(e)} placeholder='Enter new card name'/>
            <button onClick={() => handleAddNewCard(column.id)}>+</button>
            <Column 
              id={column.id}
              key={column.id}
              >
              {column.cards.map(card =>
                <Card 
                  id={card.id}
                  key={card.id}
                  >
                  {card.name}
                </Card>
              )}
            </Column>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
