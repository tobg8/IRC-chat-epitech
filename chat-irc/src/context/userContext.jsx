/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import notify from '../services/notifyEvent';

export const UserContext = React.createContext();

function UserContextProvider(props) {
  const [user, setUser] = React.useState(null);
  const [channels, setChannels] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedChannel, setSelectedChannel] = React.useState(null);

  const getChannels = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        process.env.REACT_APP_SERVER_ENDPOINT + '/getChannels'
      );

      if (response.status === 200) {
        setChannels(response.data.channels);
        notify('🟢 | Channels successfully fetched');
        setIsLoading(false);
      }
    } catch (error) {
      notify('🔴 | Something went wrong when fetching channels');
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        channels,
        setChannels,
        getChannels,
        isLoading,
        setIsLoading,
        selectedChannel,
        setSelectedChannel
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
