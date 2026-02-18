import { Bot } from 'node-telegram-bot-api';
import { Config } from './config';

export class TelegramService {
    async executeCommand(command: any, chatId: number, userId: number, username: string) {
        try {
            const bot = new Bot(Config.botToken);
            switch (command.type) {
                case 'poll':
                    await bot.sendPoll(chatId, command.question, command.options);
                    break;
                case 'delete':
                    await bot.deleteMessage(chatId, command.messageId);
                    break;
                case 'ban':
                    await bot.banChatMember(chatId, command.userId);
                    break;
                case 'mute':
                    await bot.restrictChatMember(chatId, command.userId, {
                        can_send_messages: false,
                        until_date: command.duration
                    });
                    break;
                case 'warn':
                    await bot.sendMessage(chatId, `@${username} has been warned.`);
                    break;
                case 'pin':
                    await bot.pinChatMessage(chatId, command.messageId);
                    break;
                case 'send':
                    await bot.sendMessage(chatId, command.text);
                    break;
                default:
                    break;
            }
        } catch (error) {
            throw error;
        }
    }
}
