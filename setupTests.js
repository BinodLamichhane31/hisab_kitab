import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


process.env.VITE_API_BASE_URL = 'http://localhost:6060/api/';

import '@testing-library/jest-dom';