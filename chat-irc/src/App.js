import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { socket } from './services/socket.js';

import './index.css';

function App() {
  socket.on('connection', () => {
    console.log('connected via socket');
  });
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<Home />} />
        <Route exact path="/:roomId" component={<ChatRoom />} /> */}
      </Routes>
      <p>DO something here</p>
    </Router>
  );
}

export default App;
