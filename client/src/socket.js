// socket.js

import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // Adjust the URL based on your server

export default socket;
