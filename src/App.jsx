import './App.css';
import ToDoList from './components/ToDoList';




import React from 'react';



function App() {
    return (
        <div className="app">
            <header className="app-header">
                <ToDoList />
            </header> 
        </div>
    );
}

export default App;
