import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

function App() {

  const[message, setMessage] = useState();

  useEffect(() => {
    const fetchData = async() =>{
      try{
        const res = await axios.get('http://localhost:8000/');
        setMessage(res.data.message);
      }catch{
        console.log('error')
      }
    }

    fetchData();
  }, [])

  return (
    <div className="App">
      {message}
    </div>
  );
}

export default App;
