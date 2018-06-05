import io from 'socket.io-client';

const PORT = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : undefined;
const socket = io(PORT);

socket.on('connect', () => {
  console.log('Client connected!');
});

export default socket;
