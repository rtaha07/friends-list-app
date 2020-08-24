const axios = require('axios');

const render = (friends) => {
  const list = document.querySelector('ul');
  const friendsList = friends
    .map((friend) => {
      return `
            <h1>${friend.name} </h1>
            <li classList="friend-name" data-id='${friend.id}'>
              <span>(${friend.rating})</span>
              <button type="button" class="subtract-friend">-</button>
              <button type="button" class="add-friend">+</button>
              <button type="button" class="clear-name">x</button>
            </li>
      `;
    })
    .join('');
  // const list = document.querySelector('#friendsList');
  list.innerHTML = friendsList;

  list.addEventListener('click', async (ev) => {
    if (ev.target.tagName === 'BUTTON') {
      const buttonList = ev.target.className;
      const id = ev.target.getAttribute('data-id');
      if (buttonList === 'add-friend') {
        await axios.put(`api/friends/${id}`, {
          method: 'adding',
        });
      } else if (buttonList === 'subtract-friend') {
        await axios.put(`api/friends/${id}`, {
          method: 'subtracting',
        });
      } else if (buttonList === 'clear-friend') {
        await axios.delete(`api/friends/${id}`, {
          method: 'deleting',
        });
      }
    }
  });
};

const init = async () => {
  const response = await axios.get('/api/friends');
  const friends = response.data;
  render(friends);
};

init();

module.exports = {
  render,
};
