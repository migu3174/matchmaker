import { AxiosResponse } from 'axios';
import { BaseConsumeRest } from '../utils/baseConsumeRest';
import { ExecuteWebhookParams } from './interfaces/IDiscord';

export class DiscordClient {
    private id: string;
    private token: string;

    constructor({ id, token }: { id: string; token: string }) {
        this.id = id;
        this.token = token;
    }

    public async send(data: ExecuteWebhookParams): Promise<AxiosResponse> {
        const url = `https://discord.com/api/webhooks/${this.id}/${this.token}`;
        return BaseConsumeRest.request({ url, data, method: 'POST' });
    }
}
