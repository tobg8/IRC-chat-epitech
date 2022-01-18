import React from 'react';
import './style.css';
import { UserContext } from '../../context/userContext';
import { TextField, Button, Paper } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import infos from '../../assets/infos.json';
import socket from '../../services/socket';

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);
  React.useEffect(() => {
    if (user) {
      navigate('/chatroom');
    }
  });

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
              padding: '1em',
              paddingBottom: '.5em',
              backgroundColor: '#b55b1136'
            }}
          >
            {infos.map(e => {
              let result = e.content.split(/[:]/);
              return (
                <div key={e.title} className="home__info-container">
                  <p className="home__info">{result[0]}</p>
                  <p className="home__info home__info-definition">
                    {result[1]}
                  </p>
                </div>
              );
            })}
          </Paper>
        </div>
        {inputField.length <= 0 && (
          <p className="home__decoration-smiley">
            😉 😉 😉 😉 😉 😉 😉 😉 😉 😉 😉 😉 😉 😉 😉 😉 😉 😉 😉
          </p>
        )}
      </section>
    </div>
  );
};

export default Home;
