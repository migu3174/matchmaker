import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import middy from '@middy/core';
import { SQSEvent } from 'aws-lambda';
import { logger } from '../common';
import { Config } from '../config';
import { DiscordClient } from '../gateway/DiscordClient';
import { ExecuteWebhookParams } from '../gateway/interfaces/IDiscord';
import sqsJsonBodyParser from '@middy/sqs-json-body-parser';

const GREEN_COLOR = 5763719;
const TITLE = 'Pairs para la presente semana';

const lambdaHandler = async (event: SQSEvent): Promise<void> => {
    logger.info('[SQS received] Lambda invoked', {
        details: { event },
    });
    const { Records } = event;
    const pairs = Records[0].body as unknown as any[];

    const params: ExecuteWebhookParams = {
        embeds: [
            {
                title: TITLE,
                description: pairs.reduce((acc, pair) => {
                    return `${acc} - ${pair}\n`;
                }, ''),
                color: GREEN_COLOR,
            },
        ],
    };
    const { id, token } = Config.getDiscordWebhookCredentials();
    const webhook = new DiscordClient({ id, token });

    try {
        await webhook.send(params);

        logger.info('[DISCORD] Sended message', {
            details: { params },
        });
    } catch (e) {
        logger.info('[SQS received] Error sending message to discord', {
            details: { e },
        });
    }
};

export const handler = middy(lambdaHandler).use(injectLambdaContext(logger)).use(sqsJsonBodyParser());
