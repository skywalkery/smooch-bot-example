'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Smooch Bot!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name}`))
		.then(() => 'askArithmetic');
        }
    },

    askArithmetic: {
        prompt: (bot) => bot.say('How much is the 2 + 2?'),
	receive: (bot, message) => {
		const answer = message.text;
		return bot.say(answer == 4 ? 'Correct' : 'Wrong')
			.then(() => answer == 4 ? 'finish' : 'askArithmetic');
	}
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
});
