import React from 'react';

import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

import notify from '../../services/notifyEvent';
import socket from '../../services/socket';

import ChannelList from '../ChannelList';
import Chat from '../Chat';

import './style.css';

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
    if (channels === null || channels.length <= 0) {
      getChannels();
    }
    socket.on('new-channels', channels => {
      setChannels(channels);
    });
    channels &&
      socket.on('channel', channel => {
        console.log(channel);
        let updateChannels = [...channels];
        const isPresent = updateChannels.filter(e => e.id === channel.id);
        console.log(isPresent);
        if (isPresent[0]) {
          updateChannels.map(e => {
            if (e.id === channel.id) {
              e.participants = channel.participants;
              e.users = channel.users;
            }
            handleChangeChannels(updateChannels);
          });
        } else {
          console.log('push channel');
          console.log(channels);
          updateChannels.push(channel);
          handleChangeChannels(updateChannels);
        }
      });
  }, [channels]);

  const handleListItemClick = (_, index) => {
    try {
      setSelectedChannel(index);

      const filteredChannel = channels.filter(e => e.id === index);
      // We check if user is already in this channel before emiting entry
      const isAlreadyInRoom = filteredChannel[0].users.filter(e => {
        return e === user;
      });

      if (!isAlreadyInRoom[0]) {
        socket.emit('channel-join', index, user, ack => {});
        notify('🟢 | You entered channel - ' + filteredChannel[0].name);
      }
    } catch (error) {
      console.log(error);
      notify('🔴 | Something went wrong when accessing a channel');
    }
  };

  const handleChangeChannels = React.useCallback(channels => {
    setChannels(channels);
  });

  return (
    <div className="chatroom">
      <section className="chatroom__container">
        <div className="chatroom__channels-container">
          <ChannelList handleListItemClick={handleListItemClick} />
        </div>
        {selectedChannel === null && (
          <section className="chatroom__placeholder">
            <p className="chatroom__placeholder--text">No channel Selected</p>
            <br></br>{' '}
            <span className="chatroom__placeholder--emojis">📪 🕳 😞</span>
          </section>
        )}
        {selectedChannel !== null && (
          <Chat {...channels.filter(e => e.id === selectedChannel)[0]} />
        )}
      </section>
    </div>
  );
};

export default ChatRoom;
