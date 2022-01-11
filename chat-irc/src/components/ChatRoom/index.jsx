import React from 'react';
import './style.css';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const ChatRoom = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  });
  const { user } = React.useContext(UserContext);

  return <div>Hello {user}</div>;
};

export default ChatRoom;
