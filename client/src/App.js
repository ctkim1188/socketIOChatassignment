import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import './App.css';
import Chat from './components/Chat';

function App() {

  //passing the port number we assigned
  const[socket] = useState(io(':7000'));

  useEffect(() => {
    console.log("this is running?");
    socket.on('Welcome', data => console.log(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to the Chat ROOM!
        </p>
          <Chat/>
      </header>
    </div>
  );
}

export default App;
