import { Bot } from 'node-telegram-bot-api';
import { Config } from './config';

export class PermissionsService {
    async isAdmin(chatId: number, userId: number) {
        try {
            const bot = new Bot(Config.botToken);
            const admins = await bot.getChatAdministrators(chatId);
            return admins.some((admin) => admin.user.id === userId);
        } catch (error) {
            throw error;
        }
    }
}
