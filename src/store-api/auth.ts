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

const getLoggedInUserClient = async (currentTestUser: UserLogin): Promise<Got> => {
    const authResponse: StoreApiAuthResponse = await getAuthToken()
    let client: Got = apiClientFactory(authResponse.token);

    // get user login client and overwrite first token
    const userLoginToken: string = await getUserLoginToken(client, currentTestUser);
    client = apiClientFactory(userLoginToken)

    return client;
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

    await client.post(url);
}

export {
    StoreApiAuthResponse,
    UserLoginResponse,
    UserLogin,
    getAuthToken,
    getUserLoginToken,
    apiClientFactory,
    logoutCurrentUser,
    getLoggedInUserClient
}