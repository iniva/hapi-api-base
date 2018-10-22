const webhookUrl = process.env.SLACK_WEBHOOK_URL || '';
const webhookBotName = process.env.SLACK_WEBHOOK_BOT_NAME || 'Hapi API Bot';

export const SLACK = {
    webhook: {
        url: webhookUrl,
        botName: webhookBotName
    }
};
