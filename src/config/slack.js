const webhookUrl = process.env.SLACK_WEBHOOK_URL || '';
const webhookBotName = process.env.SLACK_WEBHOOK_BOT_NAME || 'Hapi API Bot';

export default {
  webhook: {
    url: webhookUrl,
    botName: webhookBotName,
  },
};
