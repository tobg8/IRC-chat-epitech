import socket from './socket';
import notify from './notifyEvent';

export const socketServerConnect = () =>
  socket.on('connection', () => {
    console.log('connected to socket');
    notify('connected to socket-server');
  });

export const socketServerDisconnect = () =>
  socket.off('connection', () => {
    console.log('connected to socket');
    notify('connected to socket-server');
  });
