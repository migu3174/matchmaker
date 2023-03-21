import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class BaseConsumeRest {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        const { url, data, method, params } = config;
        return axios({
            url,
            data,
            method,
            params,
        });
    }
}
