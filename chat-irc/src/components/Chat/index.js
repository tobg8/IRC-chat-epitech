import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { UserContext } from '../../context/userContext';
import { Divider, TextField, Paper, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import Messages from '../Messages';

const Chat = ({ id, name, users, participants }) => {
  const { message, setMessage } = React.useContext(UserContext);

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
      ></Messages>

      <Paper
        component="form"
        sx={{
          backgroundColor: 'transparent',
          display: 'flex'
        }}
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
          onChange={e => setMessage(e.target.value)}
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
          sx={{
            '& .MuiButtonBase-root': {
              borderColor: 'white'
            }
          }}
          aria-label="menu"
        >
          <SendIcon color="warning" fontSize="large" />
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
