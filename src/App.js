import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React App</h1>
        <p>This is a simple counter application</p>
        <div className="counter">
          <button onClick={() => setCount(count - 1)}>-</button>
          <span className="count">{count}</span>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
        <button className="reset" onClick={() => setCount(0)}>Reset</button>
      </header>
    </div>
  );
}

export default App;
