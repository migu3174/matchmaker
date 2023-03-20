import { SQSEvent } from 'aws-lambda';
import { logger } from '../common';

export const lambdaHandler = async (event: SQSEvent): Promise<void> => {
    logger.info('[SQS received] Lambda invoked', {
        details: { event },
    });
    const { Records } = event;

    logger.info('[SQS received] Processing records', {
        details: { Records },
    });
};
