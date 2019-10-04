let {User} = require('../models/user');

exports.getUserByChatId = function getUserByChatId(chatId) {
    return User.findOne({chatId});
};

exports.saveUser = function saveUser({name, chatId, isActive = true}) {
    let user = new User({
        name,
        chatId,
        isActive,
    });

    return user.save();
};

exports.updateUserStatus = function updateUserStatus(chatId, status) {
    return User.upda
};

exports.updateNameByChatId = function (chatId, newName) {
    return User.updateOne({chatId}, {name: newName});
};
