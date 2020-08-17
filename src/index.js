const axios = require('axios');

const init = async () => {
  const response = await axios.get('/api/friends');
  const friends = response.data;
  render(friends);
};

init();
