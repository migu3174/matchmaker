import { BatchWriteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { logger } from '../common';
import { Developer } from './interfaces';

const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });
const ddbDocClient = DynamoDBDocumentClient.from(dynamoClient);
const client = new SQSClient({});

export const lambdaHandler = async (): Promise<void> => {
    const params = {
        TableName: `developers-${process.env.ENVIRONMENT}`,
    };

    console.log('sqs queue url', process.env.SQS_QUEUE_URL, process.env.ENVIRONMENT);

    try {
        const data = await ddbDocClient.send(new ScanCommand(params));
        const { devs, devsPair } = generatePairs(data.Items as Developer[]);

        const params2 = {
            RequestItems: {
                [`developers-${process.env.ENVIRONMENT}`]: devs.map((dev) => ({
                    PutRequest: {
                        Item: {
                            ...Object.entries(dev).reduce((acc, [key, value]) => ({ ...acc, [key]: { S: value } }), {}),
                            updatedAt: { N: `${Date.now()}` },
                            createdAt: { N: `${dev.createdAt}` },
                            pairHistory: {
                                L: dev.pairHistory.map((pair) => ({
                                    M: {
                                        date: { N: `${pair.date}` },
                                        pair: { S: pair.pair },
                                        partner: { S: pair.partner },
                                    },
                                })),
                            },
                        },
                    },
                })),
            },
        };

        await ddbDocClient.send(new BatchWriteItemCommand(params2));

        console.log('devsPair', JSON.stringify(devsPair, null, 2));

        await client
            .send(
                new SendMessageCommand({
                    QueueUrl: process.env.SQS_QUEUE_URL,
                    MessageBody: JSON.stringify(devsPair),
                }),
            )
            .catch((err) => {
                logger.error('[Lambda invoked] Error sending message to discord', {
                    details: { err },
                });
            });
    } catch (err) {
        logger.error('[Lambda invoked] Error creating devs pair', {
            details: { err },
        });
    }
};

const generatePairs = (devs: Developer[]): { devs: Developer[]; devsPair: string[] } => {
    let finalDevs = [...devs];

    const devsPair = [];

    const randomIndex = (num: number) => Math.floor(Math.random() * num);

    while (devs.length) {
        const firstIndex = randomIndex(devs.length);
        const [randomDev1] = devs.splice(firstIndex, 1);

        const secondIndex = randomIndex(devs.length);
        let [randomDev2] = devs.slice(secondIndex, secondIndex + 1);

        let existInHistory = randomDev1?.pairHistory?.some((pair) => pair.partner.includes(randomDev2.name));

        if (!existInHistory) {
            devs.splice(secondIndex, 1);
        }

        while (existInHistory) {
            const newSecondIndex = randomIndex(devs.length);
            const [newRandomDev2] = devs.slice(newSecondIndex, newSecondIndex + 1);
            existInHistory = randomDev1?.pairHistory?.some((pair) => pair.partner.includes(newRandomDev2.name));
            if (!existInHistory) {
                devs.splice(newSecondIndex, 1);
                randomDev2 = newRandomDev2;
            }
        }
        finalDevs = finalDevs.map((dev) => {
            if (dev.name === randomDev1?.name) {
                const initHistory = randomDev1?.pairHistory?.slice(-1) || [];
                const pairHistory = initHistory.concat({
                    pair: `${randomDev1?.name} - ${randomDev2?.name}`,
                    partner: randomDev2?.name,
                    date: Date.now(),
                });
                return {
                    ...dev,
                    pairHistory,
                };
            }
            if (dev.name === randomDev2?.name) {
                const initHistory = randomDev2?.pairHistory?.slice(-1) || [];
                const pairHistory = initHistory.concat({
                    pair: `${randomDev2?.name} - ${randomDev1?.name}`,
                    partner: randomDev1?.name,
                    date: Date.now(),
                });
                return {
                    ...dev,
                    pairHistory,
                };
            }
            return dev;
        });
        devsPair.push(`${randomDev1?.name} - ${randomDev2?.name}`);
    }
    return { devs: finalDevs, devsPair };
};
