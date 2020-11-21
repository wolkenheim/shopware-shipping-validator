import got, { Got } from 'got';
import { config } from '../config';

interface UserLogin {
    username: string,
    password: string
}

interface StoreApiAuthResponse {
    token: string,
}

interface UserLoginResponse {
    contextToken: string
}

const getAuthToken = async (): Promise<StoreApiAuthResponse> => {
    const url = config.baseUrl + 'store-api/' + config.shopwareApiVersion + '/context'

    const { body } = await got.get<StoreApiAuthResponse>(url, {
        headers: {
            'sw-access-key': config.swAccessKey,
        },
        responseType: 'json'
    });

    return body;
}

const apiClientFactory = (token: string): Got => {
    return got.extend({
        prefixUrl: config.baseUrl + 'store-api/' + config.shopwareApiVersion + '/',
        headers: {
            'sw-access-key': config.swAccessKey,
            'sw-context-token': token
        },
        responseType: 'json'
    });
}

const getUserLoginToken = async (client: Got, user: UserLogin): Promise<string> => {
    const url = 'account/login'

    const { body } = await client.post<UserLoginResponse>(url, {
        json: user
    });

    return body?.contextToken ?? ""
}

const logoutCurrentUser = async (client: Got): Promise<void> => {
    const url = 'account/logout'

    const { body } = await client.post(url, {
        json: {}
    });
}

export {
    StoreApiAuthResponse,
    UserLoginResponse,
    UserLogin,
    getAuthToken,
    getUserLoginToken,
    apiClientFactory,
    logoutCurrentUser
}