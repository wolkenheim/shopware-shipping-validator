import got, { Got } from 'got';

import { restApiConfig } from '../config';

interface AuthResponse {
    expires_in: number,
    access_token: string,
    token_type: string
}

const getAuthToken = async (): Promise<AuthResponse> => {
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

const apiClientFactory = async (): Promise<Got> => {

    const authResponse: AuthResponse = await getAuthToken()

    return got.extend({

        prefixUrl: restApiConfig.baseUrl + 'api/' + restApiConfig.shopwareApiVersion + '/',
        headers: {
            Authorization: authResponse.access_token
        },
        responseType: 'json'
    });
}

export {
    AuthResponse,
    getAuthToken,
    apiClientFactory
}