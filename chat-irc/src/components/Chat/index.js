import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { UserContext } from '../../context/userContext';
import { Divider, TextField, Paper, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { supabase } from '../../supabaseClient';

import notify from '../../services/notifyEvent';

import Messages from '../Messages';
import socket from '../../services/socket';

const Chat = ({ id, name, users, participants }) => {
  const { message, setMessage, user, channels, setUser } =
    React.useContext(UserContext);
  const [chatMessages, setChatMessages] = React.useState([]);

  React.useEffect(() => {
    fetchMessages();

    socket.on('user-renamed', response => {
      if (user === response.old_name) {
        setUser(response.new_name);
        users.map(e => {
          if (e === response.old_name) {
            e = response.new_name;
          }
        });
      }
    });
  }, [channels, user]);

  socket.on('message', channel => {
    if (chatMessages.length <= 0) {
      setChatMessages(channel.messages);
    } else {
      const oldMessages = [...chatMessages];

      const newMessage = channel.messages.slice(-1);
      oldMessages.push(newMessage[0]);

      setChatMessages(oldMessages);
    }
  });

  const fetchMessages = async () => {
    let { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('room_name', name);
    setChatMessages(messages);
  };

  const sendMessage = async () => {
    const nickNameSplit = message.split(' ');
    if (nickNameSplit[0] === '/nick') {
      socket.emit('rename-user', nickNameSplit[1], user, ack => {});
      return;
    }
    switch (message) {
      case '/users':
        socket.emit('list-users', id, user, ack => {});
        break;
      default:
        try {
          const { data, error } = await supabase
            .from('messages')
            .insert([{ content: message, user: user, room_name: name }]);
          socket.emit('send-message', message, user, id, name, ack => {});
        } catch (error) {
          console.log(error);
        }
    }
  };

  const handleChatSubmit = e => {
    if (e.keyCode === 13) {
      // submitMessage
      sendMessage();
      setMessage('');
    }

    if (e.target.id === 'submit' || e.target.parentElement.id === 'submit') {
      // submit Message
      sendMessage();
      setMessage('');
    }
  };

  const changeInputField = e => {
    // if value not equal to enter key
    if (e.target.value !== '\n') setMessage(e.target.value, 'here');
  };

  return (
    <div className="chat">
      <h2 className="chat__title">{name}</h2>
      <Divider sx={{ backgroundColor: 'white' }} />
      {/* components messages here */}

      <Messages
        users={users}
        channelId={id}
        channelName={name}
        participants={participants}
        messages={chatMessages}
      ></Messages>

      <Paper
        component="form"
        sx={{
          backgroundColor: 'transparent',
          display: 'flex'
        }}
        onSubmit={handleChatSubmit}
      >
        <TextField
          id="filled-basic"
          label="Message"
          multiline
          rows={4}
          color="warning"
          fullWidth
          variant="outlined"
          value={message}
          onChange={changeInputField}
          onKeyDown={handleChatSubmit}
          sx={{
            textarea: { color: 'white' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white'
            }
          }}
          InputLabelProps={{
            style: { color: 'white' }
          }}
        ></TextField>
        <IconButton
          id="submit"
          sx={{
            '& .MuiButtonBase-root': {
              borderColor: 'white'
            }
          }}
          aria-label="menu"
          onClick={handleChatSubmit}
        >
          <SendIcon id="submit" color="warning" fontSize="large" />
        </IconButton>
      </Paper>
    </div>
  );
};

Chat.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  participants: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(PropTypes.string)
};

export default Chat;
