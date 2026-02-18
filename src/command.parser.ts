export class CommandParser {
    parse(intent: any) {
        switch (intent.action) {
            case 'create_poll':
                return {
                    type: 'poll',
                    question: intent.poll_question,
                    options: intent.poll_options
                };
            case 'delete_message':
                return {
                    type: 'delete',
                    messageId: intent.target_message_id
                };
            case 'ban_user':
                return {
                    type: 'ban',
                    userId: intent.target_user_id
                };
            case 'mute_user':
                return {
                    type: 'mute',
                    userId: intent.target_user_id,
                    duration: intent.duration
                };
            case 'warn_user':
                return {
                    type: 'warn',
                    userId: intent.target_user_id
                };
            case 'pin_message':
                return {
                    type: 'pin',
                    messageId: intent.target_message_id
                };
            case 'send_message':
                return {
                    type: 'send',
                    text: intent.text
                };
            default:
                return {
                    type: 'none'
                };
        }
    }
}
