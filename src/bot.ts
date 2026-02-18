import { Bot } from 'node-telegram-bot-api';
import { TelegramService } from './telegram.service';
import { AiService } from './ai.service';
import { CommandParser } from './command.parser';
import { PermissionsService } from './permissions.service';
import { Config } from './config';
import { Logger } from './utils/logger';

const bot = new Bot(Config.botToken);
const telegramService = new TelegramService(bot);
const aiService = new AiService();
const commandParser = new CommandParser();
const permissionsService = new PermissionsService();
const logger = new Logger();

bot.on('message', async (msg) => {
    try {
        const text = msg.text;
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const username = msg.from.username;
        const isAdmin = await permissionsService.isAdmin(chatId, userId);
        if (!isAdmin) return;
        const intent = await aiService.getIntent(text);
        const command = commandParser.parse(intent);
        await telegramService.executeCommand(command, chatId, userId, username);
    } catch (error) {
        logger.error(error);
    }
});

bot.on('poll', async (poll) => {
    try {
        const chatId = poll.chat.id;
        const userId = poll.from.id;
        const username = poll.from.username;
        const isAdmin = await permissionsService.isAdmin(chatId, userId);
        if (!isAdmin) return;
        const intent = await aiService.getIntent(poll.question);
        const command = commandParser.parse(intent);
        await telegramService.executeCommand(command, chatId, userId, username);
    } catch (error) {
        logger.error(error);
    }
});
