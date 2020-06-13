import { Socket } from 'phoenix';

const SOCKET_SERVER = process.env.NODE_ENV === 'development' ? 'ws://localhost:4000/socket' : undefined;
const socket = new Socket(SOCKET_SERVER);

socket.connect();

export default socket;
