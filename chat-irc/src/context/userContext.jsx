/* eslint-disable react/prop-types */
import React from 'react';

export const UserContext = React.createContext();

function UserContextProvider(props) {
  const [user, setUser] = React.useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
