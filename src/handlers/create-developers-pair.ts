import { BatchWriteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
    BatchGetCommandOutput,
    DynamoDBDocumentClient,
    ScanCommand,
    PutCommandOutput,
    BatchWriteCommand,
} from '@aws-sdk/lib-dynamodb';

const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });
const ddbDocClient = DynamoDBDocumentClient.from(dynamoClient);

const devs = [
    {
        createdAt: 1679195188214,
        fullName: 'Lenin Mazabanda',
        id: '66093f46-f268-4abb-809d-acd686a9de0a',
        email: 'lenin@tinkin.one',
        name: 'Lenin',
    },
    {
        createdAt: 1679195188213,
        fullName: 'Nicolas Schmitt',
        id: 'd0f583ff-1de6-4682-be93-9ad867b62f10',
        email: 'nicolas@tinkin.one',
        name: 'Nico',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Abdías Martinez',
        id: 'a057b001-395a-4d3e-aca4-8f008fb8cf22',
        email: 'amartinez@tinkin.one',
        name: 'Abdías',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Exequiel Massimelli',
        id: '2176df6a-f6d4-4c83-a9d1-9d289593394b',
        email: 'emassimelli@tinkin.one',
        name: 'Exe',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Alex Arevalo',
        id: 'ea70bc8e-a031-43ef-9e8d-9297aaf486ae',
        email: 'alex@tinkin.one',
        name: 'Alex',
    },
    {
        createdAt: 1679195188213,
        fullName: 'Amstrong Huang',
        id: 'd4ee93e6-f4d6-4330-b873-b2854d1231ee',
        email: 'chan@tinkin.one',
        name: 'Chan',
    },
    {
        createdAt: 1679195188214,
        fullName: 'María Belén Cerón',
        id: '98bfd04d-b91c-4ea0-9dd0-aba5d5ecf118',
        email: 'mceron@tinkin.one',
        name: 'Mabe',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Alex Chicaiza',
        id: '0a72a890-5dfb-493d-8792-862e5397318a',
        email: 'achicaiza@tinkin.one',
        name: 'Alex C',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Juan Francisco Cevallos',
        id: '38a39af7-6e44-4d60-920a-eb52a584b5a1',
        email: 'jcevallos@tinkin.one',
        name: 'Juanfra',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Miguel Jurado',
        id: 'a02ec9f4-914f-471c-9873-a78e39f05463',
        email: 'miguel@tinkin.one',
        name: 'Migue',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Daniela Orellana',
        id: '0c3cb3b8-d3ac-479b-9c79-677b77be038e',
        email: 'dorellana@tinkin.one',
        name: 'Dany_Orellana',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Pedro Altamirano',
        id: '1fc17fc2-75fe-481b-864f-7298681028c6',
        email: 'pedro@tinkin.one',
        name: 'Pedro',
    },
    {
        createdAt: 1679195188213,
        fullName: 'Paul Jarrin',
        id: '0ba48fc3-34c9-45f4-932c-160f5a6c9e29',
        email: 'paul@tinkin.one',
        name: 'Paul',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Mariano Tellaeche',
        id: '12a012f2-0d55-4eb8-ae24-2f568417e481',
        email: 'mariano@tinkin.one',
        name: 'Tella',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Andrea Díaz',
        id: 'c57f06cc-920a-492a-bd7d-f6f92921c94d',
        email: 'adiaz@tinkin.one',
        name: 'Andrea',
    },
    {
        createdAt: 1679195188213,
        fullName: 'Dennis Espinoza',
        id: 'd3cdc024-76fa-4a9c-aab8-7a726fcee9a6',
        email: 'dennis@tinkin.one',
        name: 'Dennis',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Gastón Odetti Di Fiori',
        id: '24071f28-93e2-4567-890b-dfc14071575c',
        email: 'gaston@tinkin.one',
        name: 'Gastón',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Walter Huaynapata',
        id: 'f0d252a7-d61e-4e83-8b54-3456e908cb41',
        email: 'whuaynapata@tinkin.one',
        name: 'Walter',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Ian Ferreyra',
        id: '6b8f3610-fe76-44d8-a645-e3ba63767cec',
        email: 'ian@tinkin.one',
        name: 'Ian',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Lucila Allende',
        id: '92039168-5ecb-43bd-8d3e-3878d73f59ba',
        email: 'lucila@tinkin.one',
        name: 'Lucila',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Arianna Belen Armijos Inga',
        id: '2b9367c1-3cb5-4f70-8995-6a9318b15ac4',
        email: 'arianna@tinkin.one',
        name: 'Ari',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Washington Pijal Toapanta',
        id: 'cb321513-f1d8-46c8-8359-5d8091f1e58f',
        email: 'washington@tinkin.one',
        name: 'Washo',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Xavier Méndez',
        id: '86e98919-dd34-4152-bf16-bd178ff97632',
        email: 'xmendez@tinkin.one',
        name: 'Xavi',
    },
    {
        createdAt: 1679195188214,
        fullName: 'Andrés Velasco',
        id: 'e74708df-f734-4b1d-96b0-dcac9af7c6b3',
        email: 'avelasco@tinkin.one',
        name: 'Andrés V',
    },
];

interface PairHistory {
    pair: string;
    date: number;
    partner: string;
}

interface Developer {
    id: string;
    name: string;
    fullName: string;
    email: string;
    createdAt: number;
    pairHistory: PairHistory[];
}

export const lambdaHandler = async (event: any, context: any): Promise<BatchGetCommandOutput | void> => {
    const params = {
        TableName: `developers-${process.env.ENVIRONMENT}`,
    };

    try {
        const data = await ddbDocClient.send(new ScanCommand(params));
        const pairsDevs = generatePairs(data.Items as Developer[]);
        // console.log('Success :', data.Items);
        console.log('Devs :\n' + JSON.stringify(data.Items, null, 2));
        console.log('Pairs :\n' + JSON.stringify(pairsDevs, null, 2));
        // return data;

        const params2 = {
            RequestItems: {
                [`developers-${process.env.ENVIRONMENT}`]: pairsDevs.map((dev) => ({
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

        const data2 = await ddbDocClient.send(new BatchWriteItemCommand(params2));
        console.log('\nSuccess :', JSON.stringify(data2, null, 2));
    } catch (err) {
        console.error('Error', err);
        return {} as BatchGetCommandOutput;
    }
    return context.logStreamName;
};

const generatePairs = (devs: Developer[]): Developer[] => {
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
    return finalDevs;
};
