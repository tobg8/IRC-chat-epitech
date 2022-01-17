import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { UserContext } from '../../context/userContext';
import { Divider, Paper } from '@mui/material';
import socket from '../../services/socket';
import notify from '../../services/notifyEvent';

const Messages = ({ users, channelId, channelName, messages }) => {
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    socket.on('channel', socket => {
      const userEvent = socket.users[socket.users.length - 1];
      // si l'event envoyé n'est pas envoyé par moi même
      if (userEvent !== user) {
        // si je suis déja dans le chat concerné par l'event
        const userAlreadyInChat = socket.users.filter(e => e === user)[0];
        if (userAlreadyInChat !== undefined || null) {
          // j'ai une notification
          notify(`🆕 ${userEvent} | joined ${socket.name}`);
        }
      }
    });
  }, []);

  return (
    <div className="messages">
      <section className="messages__container">
        {messages &&
          messages.map(message => {
            if (message.user === user && message.chat_id === channelId) {
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
                      {message.message}
                    </p>
                  </Paper>
                </div>
              );
            } else if (message.chat_id === channelId) {
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
                      {message.message}
                    </p>
                  </Paper>
                </div>
              );
            }
          })}
      </section>
      <div className="messages__users-container">
        {users.length > 0 &&
          users.map(e => {
            if (e === user) {
              return (
                <div key={e}>
                  <p className="messages__user messages__user-me">
                    {`${e} (you)`}
                  </p>
                  <Divider sx={{ backgroundColor: 'white' }} />
                </div>
              );
            } else {
              return (
                <div key={e}>
                  <p className="messages__user">{e}</p>
                  <Divider sx={{ backgroundColor: 'white' }} />
                </div>
              );
            }
          })}
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
