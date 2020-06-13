import axios from 'axios';

const PORT = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : undefined;
const instance = axios.create({ baseURL: PORT });

export default instance;
