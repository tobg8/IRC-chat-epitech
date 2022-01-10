import socketIOClient from 'socket.io-client';

const serverEndPoint = process.env.REACT_APP_SERVER_ENDPOINT;
console.log(serverEndPoint);

export const socket = socketIOClient(serverEndPoint, {
  transports: ['websocket']
});
