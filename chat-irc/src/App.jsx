import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserContext } from './context/userContext';

import {
  socketServerConnect
  // socketServerDisconnect
} from './services/socketEvents';

import Home from './components/Home';
import ChatRoom from './components/ChatRoom';

import 'react-toastify/dist/ReactToastify.min.css';
import './styles/reset.css';
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

  const { user, setUser } = React.useContext(UserContext);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/chatroom" element={<ChatRoom />} />
      </Routes>
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
