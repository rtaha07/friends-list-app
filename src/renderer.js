const axios = require('axios');

const init = async () => {
  const response = await axios.get('/api/friends');
  const friends = response.data;
  render(friends);
};

const ul = document.querySelector('ul');
ul.addEventListener('click', async (ev) => {
  if (ev.target.tagName === 'BUTTON') {
    const buttonList = ev.target.classList.contains('friend-name');
    const id = ev.target.getAttribute('data-id');
    if (buttonList === 'add-friend') {
      await axios.put(`api/friends/${id}`, {
        category: 'adding',
      });
    } else if (buttonList === 'subtract-friend') {
      await axios.put(`api/friends/${id}`, {
        category: 'subtracting',
      });
    } else if (buttonList === 'clear-friend') {
      await axios.delete(`api/friends/${id}`, {
        category: 'deleting',
      });
    }
  }
});

init();

module.exports = {
  render,
};
