const express = require('express');

const friendList = express.Router();

friendList.post('/:id',addFriend);
friendList.delete('/:id',deleteFriend);
friendList.get('/',showFriendList);

module.exports = friendList;
