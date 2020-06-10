import React, { useEffect, useState } from 'react';
import Column from '../src/Column';
import Card from '../src/Card';
import './index.css';

const App = () => {
  const [columns, setColumns] = useState([]);
  const [newCardName, setNewCardName] = useState('');
  const columnsApi = 'data/columns.json';
  useEffect(() => {
      try { fetch(columnsApi)
        .then(response => response.json())
        .then(result => setColumns(result), error => console.log(error));
      } catch (error) { console.log(error); }
  }, []);
  const handleNewCardNameChange = (e) => {
    if (e.target.value.trim() ==='') return;
    setNewCardName(e.target.value.trim());
  }
  const handleAddNewCard = (columnId) => {
    if (newCardName ==='') return;
    let newCardId = 0;
    for (let i=0; i<columns.length; i++) { newCardId += columns[i].cards.length; }
    const newCard = {id: newCardId, name: newCardName };
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
          <div key={column.id} className='column'>
            <h3>{column.name}</h3>
            <input type='text' value={newCardName} onChange={e => handleNewCardNameChange(e)} placeholder='Enter new card name'/>
            <button onClick={() => handleAddNewCard(column.id)}>+</button>
            <Column id={column.id}>
              {column.cards.map(card =><Card key={card.id} id={card.id}>{card.name}</Card>)}
            </Column>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;