const prod = 'https://klaviyo-demo.herokuapp.com';
const dev = 'http://localhost:8081';

export const API_URL = process.env.NODE_ENV === 'development' ? dev : prod;