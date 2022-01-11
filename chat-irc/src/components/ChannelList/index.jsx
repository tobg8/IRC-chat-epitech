import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material';
import { UserContext } from '../../context/userContext';
import PropTypes from 'prop-types';

const ChannelList = ({ handleListItemClick }) => {
  const { channels, isLoading, selectedChannel } =
    React.useContext(UserContext);

  return (
    <List component="nav" aria-label="channel list">
      {isLoading && <p>Loading</p>}
      {!isLoading && <Divider sx={{ backgroundColor: 'white' }} />}
      {channels &&
        channels.map(e => (
          <div key={e.id}>
            <ListItem
              disablePadding
              sx={{
                borderLeft: '1px solid white',
                borderRight: '1px solid white',
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
  );
};

ChannelList.propTypes = {
  handleListItemClick: PropTypes.func.isRequired
};

export default ChannelList;
