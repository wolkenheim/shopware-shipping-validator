import got, { Got } from 'got';

import { restApiConfig } from '../config';

interface AuthResponse {
    expires_in: number,
    access_token: string,
    token_type: string
}

interface ShippingMethod {
    name: string,
    id: string,
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

const apiClientFactory = (token: string): Got => {
    return got.extend({

        prefixUrl: restApiConfig.baseUrl + 'api/' + restApiConfig.shopwareApiVersion + '/',
        headers: {
            Authorization: token
        },
        responseType: 'json'
    });
}

const getAllShippingMethods = async (client: Got) => {
    const url = 'shipping-method'
    const { body } = await client.get<{ data: ShippingMethod[] }>(url);

    return body
}


export {
    AuthResponse,
    getAuthToken,
    apiClientFactory,
    getAllShippingMethods
}