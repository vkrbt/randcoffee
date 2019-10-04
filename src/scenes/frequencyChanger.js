const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');

const frequencyChanger = new Scene('frequency-changer');

frequencyChanger.enter(async (ctx) => {
    ctx.reply('Установите ваш статус участия:', Markup
        .keyboard([
            [
                Markup.button('☺️Участвую'),
                Markup.button('🙁Пока нет'),
            ]
        ])
        .oneTime()
        .resize(true)
        .extra()
    );
});

frequencyChanger.hears('☺️Участвую', (ctx) => {

    ctx.scene.enter('main')
});


frequencyChanger.hears('🙁Пока нет', (ctx) => {

    ctx.scene.enter('main')
});

exports.frequencyChanger = frequencyChanger;
