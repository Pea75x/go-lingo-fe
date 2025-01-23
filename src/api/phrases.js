import axios from 'axios';

export const searchPhrases = async (location) => {
  const options = {
    method: 'GET',
    url: `${process.env.REACT_APP_API_ENDPOINT}/location-phrases/${encodeURIComponent(location)}`,
    headers: {
      Accept: 'application/json'
      // authorization: `Bearer ${token}`
    }
  };
  const { data } = await axios.request(options);
  return data;
};