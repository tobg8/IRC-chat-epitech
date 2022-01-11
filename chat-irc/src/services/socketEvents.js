import socket from './socket';
import notify from './notifyEvent';

export const socketServerConnect = () =>
  socket.on('connection', () => {
    notify('connected to socket-server');
    console.log('????');
  });

export const socketServerDisconnect = () =>
  socket.off('connection', () => {
    notify('connected to socket-server');
  });
