const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const {fillWith} = require('../fillWith');
const translates  = require('../answers.json');

const main = new Scene('main');

main.enter(async (ctx) => {
    let chat = await ctx.getChat();

    let chatId = chat.id;

    let title = fillWith(translates.main, {name: ctx.session.state.user.name});
    let status = translates.statusActive;
    let pair = fillWith(translates.pair, {link: `[Василий Петрович](tg://user?id=${chatId})`});

    let reply = [title, status, pair].join('\n');

    ctx.replyWithMarkdown(reply, Markup
        .keyboard([
            [
                Markup.button('⚙️Изменить имя'),
                Markup.button('🗓Изменить частоту встреч'),
            ],
        ])
        .resize(true)
        .extra()
    );
});

main.hears('⚙️Изменить имя', (ctx) => {
    ctx.scene.enter('updatedName');
});

main.hears('🗓Изменить частоту встреч', (ctx) => {
    ctx.scene.enter('frequency-changer');
    console.log(ctx);
});

exports.main = main;
