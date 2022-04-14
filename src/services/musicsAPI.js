const axios = require('axios');

const headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS');
// Source: https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe

const getMusics = async (id) => {
  const request = await axios(`https://itunes.apple.com/lookup?id=${id}&entity=song`, {
    credentials: 'include',
    method: 'GET',
    headers,
  });
  return request.data.results;
};

export default getMusics;
