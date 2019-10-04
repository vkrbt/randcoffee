const dotenv = require('dotenv');
const Telegraf = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const {leave} = require('telegraf/stage');
const {nameChanger} = require('./scenes/nameChanger');
const {frequencyChanger} = require('./scenes/frequencyChanger');
const {nameScene} = require('./scenes/name');
const {main} = require('./scenes/main');
const user = require('./services/user');
const mongoose = require('mongoose');

dotenv.config();

if (!process.env.TG_TOKEN) {
    throw Error('No token provided');
}

let bot = new Telegraf(process.env.TG_TOKEN);

const stage = new Stage();
stage.command('cancel', leave());
stage.register(nameScene);
stage.register(nameChanger);
stage.register(frequencyChanger);
stage.register(main);

bot.use(session());
bot.use(stage.middleware());

bot.use(async (ctx, next) => {
    let chat = await ctx.getChat();
    ctx.session.state = {
        user: await user.getUserByChatId(chat.id),
    };

    return next()
});

bot.catch((err, ...args) => {
    console.log(err, args);
});

bot.start(async (ctx) => {
    ctx.scene.enter('main');
});

let db = mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds014808.mlab.com:14808/anhour`, {useNewUrlParser: true});

db.then(() => {
    bot.context.db = db;
    bot.launch();
});
