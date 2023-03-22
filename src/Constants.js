const prod = {
  url: {
    API_URL: 'https://city-explorer-api-jqdk.onrender.com'
  }
};
const dev = {
  url: {
    API_URL: 'http://localhost:3001'
  }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;