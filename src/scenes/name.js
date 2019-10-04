const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const translates  = require('../answers.json');
const {fillWith} = require('../fillWith');

// Name scene;
const nameScene = new Scene('updatedName');
nameScene.enter(async (ctx) => {
    let chat = await ctx.getChat();

    console.log(ctx.session.state.user);

    let reply = fillWith(translates.name, {
        name: `*${ctx.session.state.user.name}*`,
    });

    ctx.replyWithMarkdown(reply, Markup
        .keyboard([
            [
                Markup.button('✏️Изменить имя'),
                Markup.button('⬅️Главное меню'),
            ]
        ])
        .oneTime()
        .resize(true)
        .extra()
    );
});

nameScene.hears('⬅️Главное меню', (ctx) => {
    ctx.scene.enter('main');
});

nameScene.hears('✏️Изменить имя', (ctx) => {
    ctx.scene.enter('name-changer');
});

exports.nameScene = nameScene;
