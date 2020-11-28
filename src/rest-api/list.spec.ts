import { AuthResponse, getAuthToken, apiClientFactory, makeApiRequest } from './rest-api';
import got, { Got } from 'got';

describe('list', () => {
    it('shsd', async () => {
        const authResponse: AuthResponse = await getAuthToken()
        const client: Got = apiClientFactory(authResponse.access_token);
        const apiResponse = await makeApiRequest(client)
        console.log(apiResponse);

    })
})