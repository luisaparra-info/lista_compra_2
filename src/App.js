import React, { useState } from 'react';
import './styles.css';

function Header() {
  return (
    <div className="header">
      <h1>Lista de la compra</h1>
    </div>
  );
}

function AddItemForm({ onAddItem }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addItem = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      onAddItem(inputValue);
      setInputValue('');
    }
  };

  return (
    <form className="add-item-form" onSubmit={addItem}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Escribe un producto..."
      />
    </form>
  );
}

function ShoppingListItem({ item, onToggleCheck }) {
  return (
    <li
      className={item.checked ? 'checked' : ''}
      onClick={() => onToggleCheck(item)}
    >
      <span>{item.name}</span>
    </li>
  );
}

function ShoppingList({ items, onToggleCheck, onDeleteSelectedItems }) {
  return (
    <ul className="item-list">
      {items.map((item, index) => (
        <ShoppingListItem
          key={index}
          item={item}
          onToggleCheck={onToggleCheck}
        />
      ))}
      {items.some(item => item.checked) && (
        <li className="delete-btn" onClick={onDeleteSelectedItems}>Eliminar seleccionados</li>
      )}
    </ul>
  );
}

function App() {
  const [items, setItems] = useState([]);

  const addItem = (itemName) => {
    setItems([...items, { name: itemName, checked: false }]);
  };

  const toggleCheck = (clickedItem) => {
    const updatedItems = items.map(item =>
      item === clickedItem ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  const deleteSelectedItems = () => {
    const updatedItems = items.filter(item => !item.checked);
    setItems(updatedItems);
  };

  return (
    <div className="app">
      <Header />
      <AddItemForm onAddItem={addItem} />
      <ShoppingList
        items={items}
        onToggleCheck={toggleCheck}
        onDeleteSelectedItems={deleteSelectedItems}
      />
    </div>
  );
}

export default App;
