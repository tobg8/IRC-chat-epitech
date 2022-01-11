import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { UserContext } from '../../context/userContext';
import { Divider } from '@mui/material';

const Messages = ({ users, channelId, channelName }) => {
  const { user } = React.useContext(UserContext);

  return (
    <div className="messages">
      <section className="messages__container">
        <h3>Messages here</h3>
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
  channelName: PropTypes.string.isRequired
};

export default Messages;
