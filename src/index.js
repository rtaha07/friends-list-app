const axios = require('axios');

const render = (friends) => {
  const list = document.querySelector('ul');
  const friendsList = friends
    .map((friend) => {
      return `
            <h2>${friend.name} </h2>
            <li classList="friend-name" data-id='${friend.id}'>
              <span>(${friend.rating})</span>
              <button type="button" class="subtract-friend" >-</button>
              <button type="button" class="add-friend" >+</button>
              <button type="button" class="clear-name" >x</button>
            </li>
      `;
    })
    .join('');
  list.innerHTML = friendsList;
};

const init = async () => {
  const response = await axios.get('/api/friends');
  const friends = response.data;
  render(friends);

  const list = document.querySelector('ul');
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
        await axios.destroy(`api/friends/${id}`);
      }
    }
  });
};

// const init = async()=> {
//   const response = await axios.get('/api/friends');
//   let friends = response.data;
//   render(friends);
//   const list = document.querySelector('ul');
//   const form = document.querySelector('form');
//   const input = document.querySelector('input');

//   list.addEventListener('click', async(ev)=> {
//     if(ev.target.tagName === 'BUTTON'){
//       if(ev.target.innerHTML === 'x'){
//         const id = ev.target.getAttribute('data-id')*1;
//         await axios.delete(`/api/friends/${id}`);
//         friends = friends.filter(friend => friend.id !== id);
//         render(friends);
//       }
//       else {
//         const id = ev.target.getAttribute('data-id')*1;
//         const friend = friends.find(item => item.id === id);
//         const increase = ev.target.innerHTML === '+';
//         friend.rating = increase ? ++friend.rating : --friend.rating;
//         await axios.put(`/api/friends/${friend.id}`, { rating: friend.rating });
//         render(friends);
//       }
//     }
//   });

//   form.addEventListener('submit', async(ev)=> {
//     ev.preventDefault();
//       const response = await axios.post('/api/friends', { name: input.value });
//       friends.push(response.data);
//       input.value = '';
//       render(friends);
//   });
// };

// const init = async () => {
//   const response = await axios.get('/api/friends');
//   const friends = response.data;
//   render(friends);
//};

init();
