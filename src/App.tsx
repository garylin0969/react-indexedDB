import { useEffect, useState } from 'react';
import './App.css';
import useIndexedDB from './useIndexedDB';

function App() {
    const { db, addItem, getAllItems } = useIndexedDB();
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);

    async function handleAddItem() {
        await addItem({ text: inputValue });
        setInputValue('');
        const allItems = await getAllItems();
        setItems(allItems);
        localStorage.setItem('items', JSON.stringify(allItems));
    }

    async function fetchData() {
        const allItems = await getAllItems();
        console.log(allItems);

        setItems(allItems);
    }

    useEffect(() => {
        fetchData();
    }, [db]);

    return (
        <div>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={handleAddItem}>Add Item</button>
            <ul>
                {items.map((item: any) => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
