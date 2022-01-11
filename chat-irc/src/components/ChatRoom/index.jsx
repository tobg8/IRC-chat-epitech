import React from 'react';

import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { socketJoinChannel } from '../../services/socketEvents';

import notify from '../../services/notifyEvent';
import socket from '../../services/socket';

import ChannelList from '../ChannelList';

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
    if (channels === null) {
      getChannels();
    }

    channels &&
      socket.on('channel', channel => {
        let updateChannels = [...channels];
        updateChannels.map(e => {
          if (e.id === channel.id) {
            e.participants = channel.participants;
          }
          handleChangeChannels(updateChannels);
        });
      });
  }, [selectedChannel]);

  const handleListItemClick = (_, index) => {
    try {
      setSelectedChannel(index);
      socketJoinChannel(index);
      notify('🟢 | Enter channel - ' + channels[index - 1].name);
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
          {isLoading && <p>Loading</p>}
          <ChannelList handleListItemClick={handleListItemClick} />
        </div>
      </section>
    </div>
  );
};

export default ChatRoom;
