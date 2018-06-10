import axios from 'axios';

const PORT = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : undefined;
const instance = axios.create({ baseURL: PORT, withCredentials: true });

export default instance;
