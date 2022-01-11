import React from 'react';
import socket from './socket';
import notify from './notifyEvent';
import { UserContext } from '../context/userContext';

export const socketServerConnect = () =>
  socket.on('connection', () => {
    notify('💬 connected to socket-server');
  });

export const socketServerDisconnect = () =>
  socket.off('connection', () => {
    notify('connected to socket-server');
  });

export const socketJoinChannel = id => {
  socket.emit('channel-join', id, ack => {});
};
