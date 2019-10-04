const Scene = require('telegraf/scenes/base');
const {fillWith} = require('../fillWith');
const user = require('../services/user');
const translates  = require('../answers.json');

const nameChanger = new Scene('name-changer');

nameChanger.enter(async (ctx) => {
    ctx.reply('Пришлите мне ваше имя: ');
});

nameChanger.on('message', async (ctx) => {
    let newName = ctx.message.text;
    let chat = ctx.getChat();

    await user.updateNameByChatId(chat.id, newName);

    let reply = fillWith(translates.updatedName, {
        name: newName,
    });

    ctx.reply(reply);
    ctx.scene.enter('main')
});


exports.nameChanger = nameChanger;
