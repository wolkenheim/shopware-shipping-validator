import { AuthResponse, getAuthToken, apiClientFactory, getAllShippingMethods } from './rest-api';
import got, { Got } from 'got';

describe('list', () => {
    it('shsd', async () => {
        const authResponse: AuthResponse = await getAuthToken()
        const client: Got = apiClientFactory(authResponse.access_token);

        const allShippingMethods = await getAllShippingMethods(client)
        console.log("allShippingMethods")

        const mapped = allShippingMethods.data.map(shipping => ({ name: shipping.name, id: shipping.id }))
        console.table(mapped)

    })
})