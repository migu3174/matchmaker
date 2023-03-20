import { SQSEvent } from 'aws-lambda';
import { logger } from '../common';
import { Config } from '../config';
import { DiscordClient } from '../gateway/DiscordClient';

export const lambdaHandler = async (event: SQSEvent): Promise<void> => {
    logger.info('[SQS received] Lambda invoked', {
        details: { event },
    });
    const { Records } = event;
    const { id, token } = Config.getDiscordWebhookCredentials();

    logger.info('[SQS received] Processing records', {
        details: { id, token },
    });

    const webhook = new DiscordClient({ id, token });

    try {
        await webhook.send({
            embeds: [
                {
                    title: 'Mensaje de prueba',
                    description: 'Mensaje de prueba',
                    color: 16711680,
                },
            ],
        });

        logger.info('[SQS received] Processing records', {
            details: { Records },
        });
    } catch (e) {
        logger.info('[SQS received] Error sending message to discord', {
            details: { e },
        });
    }
};
