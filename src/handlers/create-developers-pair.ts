import { APIGatewayProxyEvent } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { BatchGetCommandOutput, DynamoDBDocumentClient, ScanCommand, PutCommandOutput } from '@aws-sdk/lib-dynamodb';

const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });
const ddbDocClient = DynamoDBDocumentClient.from(dynamoClient);
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<BatchGetCommandOutput | PutCommandOutput> => {
    console.log('Env :', process.env.ENVIRONMENT);
    // const params = {
    //     RequestItems: {
    //         [`developers-${process.env.ENVIRONMENT}`]: {
    //             Keys: [
    //                 {
    //                     id: { S: '1' },
    //                 },
    //                 // {
    //                 //     createdAt: { N: 2222222 },
    //                 // },
    //             ],
    //         },
    //     },
    // };

    const params = {
        TableName: `developers-${process.env.ENVIRONMENT}`,
    };

    // const params = {
    //     Item: {
    //         id: '1',
    //         createdAt: Date.now(),
    //     },
    //     TableName: `developers-${process.env.ENVIRONMENT}`,
    // };

    try {
        // const data = await ddbDocClient.send(new PutCommand(params));
        const data = await ddbDocClient.send(new ScanCommand(params));
        console.log('Success :', data);
        // console.log("Success :", data.Item);
        return data;
    } catch (err) {
        console.error('Error', err);
        return {} as BatchGetCommandOutput;
    }
};
