import React from 'react';
import './style.css';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material';
import { socketJoinChannel, socketChannel } from '../../services/socketEvents';
import notify from '../../services/notifyEvent';

import socket from '../../services/socket';

const ChatRoom = () => {
  const navigate = useNavigate();
  const {
    user,
    channels,
    getChannels,
    setChannels,
    isLoading,
    setSelectedChannel,
    selectedChannel
  } = React.useContext(UserContext);

  React.useEffect(() => {
    if (!user) {
      return navigate('/');
    }
    if (channels === null) {
      getChannels();
    }

    channels &&
      socket.on('channel', channel => {
        let updateChannels = [...channels];

        updateChannels.map(e => {
          if (e.id === channel.id) {
            e.participants = channel.participants;
            if (channel.id === selectedChannel && channel.participants > 0) {
              console.log(channel.id, selectedChannel);
              notify('💚 | Enter channel - ' + channel.name);
            }
          }
          handleChangeChannels(updateChannels);
        });
      });
  }, [selectedChannel]);

  const handleListItemClick = (_, index) => {
    try {
      setSelectedChannel(index);
      socketJoinChannel(index);
    } catch (error) {
      console.log(error);
      notify('🔴 | Something went wrong when accessing a channel');
    }
  };

  const handleChangeChannels = React.useCallback(channels => {
    setChannels(channels);
  });

  return (
    <div className="chat">
      <section className="chat__container">
        <div className="chat__channels-container">
          <List component="nav" aria-label="secondary mailbox folder">
            {!isLoading && <Divider sx={{ backgroundColor: 'white' }} />}
            {channels &&
              channels.map(e => (
                <div key={e.id}>
                  <ListItem
                    disablePadding
                    sx={{
                      // selected and (selected + hover) states
                      '&& .Mui-selected, && .Mui-selected:hover': {
                        bgcolor: '#b55b11'
                      },
                      // hover state
                      '& .MuiListItemButton-root:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.149)'
                      }
                    }}
                  >
                    <ListItemButton
                      selected={e.id === selectedChannel}
                      onClick={event => handleListItemClick(event, e.id)}
                    >
                      <ListItemText primary={e.name} sx={{ color: 'white' }} />
                      <ListItemText
                        primary={e.participants}
                        sx={{ color: 'white', textAlign: 'end' }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider sx={{ backgroundColor: 'white' }} />
                </div>
              ))}
          </List>

          {isLoading && <p>Loading</p>}
        </div>
      </section>
    </div>
  );
};

export default ChatRoom;
