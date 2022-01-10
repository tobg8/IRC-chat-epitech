import socketIOClient from 'socket.io-client';

const serverEndPoint = process.env.REACT_APP_SERVER_ENDPOINT;

const socket = socketIOClient(serverEndPoint, {
  transports: ['websocket']
});

export default socket;
