export const Config = {
    getDiscordWebhookCredentials: () => {
        return {
            id: process.env.DISCORD_WEBHOOK_ID || '',
            token: process.env.DISCORD_WEBHOOK_TOKEN || '',
        };
    },
};
