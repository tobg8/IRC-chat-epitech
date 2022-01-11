import React from 'react';
import './style.css';
import { UserContext } from '../../context/userContext';
import {
  TextField,
  Button,
  Paper,
  ListItem,
  ListItemText
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import infos from '../../assets/infos.json';

const Home = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (user) {
      navigate('/chatroom');
    }
  });

  const { user, setUser } = React.useContext(UserContext);

  const [inputField, setInputField] = React.useState('');

  const marginCustom = inputField.length > 0 ? '0' : '2em';

  const handleSetUser = () => {
    setUser(inputField);
    setInputField('');
  };

  return (
    <div className="home">
      <p className="home__title">Welcome 😊</p>
      <section className="home__user-container">
        <div className="home__form-container">
          <p className="home__user-title">Choose an username</p>
          <TextField
            id="filled-basic"
            label="type here"
            color="warning"
            variant="outlined"
            value={inputField}
            onChange={e => setInputField(e.target.value)}
            sx={{
              input: { color: 'white' },
              marginBottom: marginCustom,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white'
              }
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
          />

          {inputField.length > 0 && (
            <div className="home__button-container">
              <Button
                variant="outlined"
                size="large"
                color="warning"
                onClick={handleSetUser}
                fullWidth={true}
              >
                Connect to chatroom
              </Button>
            </div>
          )}
        </div>
        <div className="home__infos-container">
          <Paper
            elevation={24}
            sx={{
              width: '100%',
              minHeight: '250px',
              padding: '.5em',
              backgroundColor: '#b55b1182'
            }}
          >
            {Object.keys(infos).map((key, index) => (
              <ListItem disablePadding key={index}>
                <ListItemText
                  primary={`${key.charAt(0).toUpperCase()}${key.slice(1)}- ${
                    infos[key]
                  }`}
                  sx={{ padding: '.3em', color: 'white' }}
                />
              </ListItem>
            ))}
          </Paper>
        </div>
      </section>
    </div>
  );
};

Home.propTypes = {};

export default Home;
