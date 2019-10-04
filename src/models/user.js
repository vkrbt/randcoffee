const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    chatId: String,
    description: String,
    isActive: Boolean,
});

exports.User = mongoose.model('User', UserSchema);
