import React, {useState} from 'react';
import './App.css';
import axios from "axios";

function App() {

const [message, setMessage]=useState();

    axios.get("/hallo")
        .then(response => response.data)
        .then(setMessage)

  return (
    <div className="App">
<h1>{message}</h1>
    </div>
  );
}

export default App;
