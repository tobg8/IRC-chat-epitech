import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { UserContext } from '../../context/userContext';
import { Divider, Paper } from '@mui/material';
import socket from '../../services/socket';
import notify from '../../services/notifyEvent';

const Messages = ({ users, channelId, channelName, messages }) => {
  const { user } = React.useContext(UserContext);
  const [infosMessage, setInfosMessages] = React.useState([]);
  const [count, setCount] = React.useState([]);

  React.useEffect(() => {
    socket.on('listed-users', response => {
      if (response.username === user) {
        setInfosMessages(response.users);
      }
    });
    chatRef.current.scrollIntoView();
  }, [messages]);

  const chatRef = React.useRef(null);

  socket.on('channel', socket => {
    const userEvent = socket.users[socket.users.length - 1];
    // si l'event envoyé n'est pas envoyé par moi même

    if (userEvent !== user) {
      // si je suis déja dans le chat concerné par l'event
      const userAlreadyInChat = socket.users.filter(e => e === user)[0];
      if (userAlreadyInChat !== undefined || null) {
        // j'ai une notification
        const alreadyHere = count.filter(e => e.user === userEvent);
        if (alreadyHere[0]) {
          if (e.roomName !== socket.name) {
            count.push({
              user: userEvent,
              roomName: socket.name
            });
            return notify(`🆕 ${userEvent} | joined ${socket.name}`);
          }
        } else {
          console.log('wowowowo');
          count.push({
            user: userEvent,
            roomName: socket.name
          });
          return notify(`🆕 ${userEvent} | joined ${socket.name}`);
        }
      }
    }
  });

  return (
    <div className="messages">
      <section className="messages__container">
        {messages &&
          messages.map(message => {
            if (message.user === user && message.room_name === channelName) {
              return (
                <div key={message.message} className="messages__message-owner">
                  <Paper
                    elevation={16}
                    sx={{
                      backgroundColor: '#b55b11',
                      width: '30%',
                      padding: '.5em',
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      marginBottom: '.5em'
                    }}
                  >
                    <p className="messages__message--user">{message.user} -</p>
                    <Divider sx={{ backgroundColor: 'white' }} />
                    <p className="messages__message--message">
                      {message.content}
                    </p>
                  </Paper>
                </div>
              );
            } else if (message.room_name === channelName) {
              return (
                <div key={message.message} className="messages__message-normal">
                  <Paper
                    elevation={16}
                    sx={{
                      backgroundColor: 'black',
                      width: '30%',
                      padding: '.5em',
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      marginBottom: '.5em'
                    }}
                  >
                    <p className="messages__message--user">{message.user} -</p>
                    <Divider sx={{ backgroundColor: 'white' }} />
                    <p className="messages__message--message">
                      {message.content}
                    </p>
                  </Paper>
                </div>
              );
            }
          })}
        {infosMessage.length > 0 &&
          infosMessage.map(e => (
            <Paper
              key={e}
              elevation={16}
              sx={{
                backgroundColor: '#b55b11',
                width: '30%',
                padding: '.5em',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                marginBottom: '.5em'
              }}
            >
              <p className="messages__message--message">{e}</p>
            </Paper>
          ))}
        <div ref={chatRef}></div>
      </section>
      <div className="messages__users-container">
        {users.length > 0 &&
          users.map(e => {
            if (e !== user) {
              return (
                <div key={e}>
                  <p className="messages__user">{e}</p>
                  <Divider sx={{ backgroundColor: 'white' }} />
                </div>
              );
            }
          })}
        <div>
          <p className="messages__user messages__user-me">{`${user} (you)`}</p>
          <Divider sx={{ backgroundColor: 'white' }} />
        </div>
      </div>
    </div>
  );
};

Messages.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string.isRequired),
  channelId: PropTypes.number.isRequired,
  channelName: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object)
};

export default Messages;
