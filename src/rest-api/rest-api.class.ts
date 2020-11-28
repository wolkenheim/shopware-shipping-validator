import got, { Got } from 'got';

import { restApiConfig } from '../config';

interface AuthResponse {
    expires_in: number,
    access_token: string,
    token_type: string
}

export class RestAPIClient {

    async getAuthToken(): Promise<AuthResponse> {
        const url = restApiConfig.baseUrl + 'api/oauth/token'
        const params = {
            "grant_type": "client_credentials",
            "client_id": restApiConfig.clientId,
            "client_secret": restApiConfig.clientSecret
        }
        const { body } = await got.post(url, {
            json: params,
            responseType: 'json'
        });

        return body as AuthResponse
    }

    apiClientFactory(token: string): Got {
        return got.extend({

            prefixUrl: restApiConfig.baseUrl + 'api/' + restApiConfig.shopwareApiVersion + '/',
            headers: {
                Authorization: token
            },
            responseType: 'json'
        });
    }
}