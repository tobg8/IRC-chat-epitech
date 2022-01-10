/* eslint-disable import/extensions */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import Button from '@mui/material/Button';

import socket from './services/socket.js';
import notify from './services/notifyEvent';

import {
  socketServerConnect
  // socketServerDisconnect
} from './services/socketEvents';

import 'react-toastify/dist/ReactToastify.min.css';
import './index.css';

function App() {
  React.useEffect(() => {
    // When we connect to server
    socketServerConnect();
    return () => {
      // When we disconnect from server
      // ? not usefull
      // socketServerDisconnect();
    };
  });

  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<Home />} />
        <Route exact path="/:roomId" component={<ChatRoom />} /> */}
      </Routes>
      <p>DO something here</p>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </Router>
  );
}

export default App;
