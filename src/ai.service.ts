import axios from 'axios';
import { Config } from './config';

export class AiService {
    async getIntent(text: string) {
        try {
            const response = await axios.post(
                'https://api.groq.com/v1/intent',
                { text },
                {
                    headers: {
                        'Authorization': `Bearer ${Config.groqToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
