import { Got } from 'got'
import { StoreApiAuthResponse, apiClientFactory, getAuthToken, getUserLoginToken, UserLogin, logoutCurrentUser } from './auth'

import { getContext, ContextResponse } from './store-api-sales'
import { getCustomerAddresses } from './account';

import { testUsers } from '../config';

describe('Account Login', () => {

    const testFactory = async (testUser: UserLogin, testCountryIso: string): Promise<void> => {
        const authResponse: StoreApiAuthResponse = await getAuthToken()
        let client: Got = apiClientFactory(authResponse.token)

        // get user login client and overwrite first token
        const userLoginToken: string = await getUserLoginToken(client, testUser)
        client = apiClientFactory(userLoginToken);

        const addresses = await getCustomerAddresses(client);

        // should have one address
        expect(addresses.total).toBe(1)
        expect(addresses.elements[0].country.iso).toBe(testCountryIso)

        // shop context and shipping address for logged in user should be in language
        const context = await getContext(client)

        expect(context.shippingLocation?.country?.iso).toBe(testCountryIso)
        expect(context.shippingLocation?.country?.active).toBeTruthy()

        // tear down and log out user before other test run
        await logoutCurrentUser(client);
    }

    it('italian customer should get italian shipping context', async () => {
        testFactory(testUsers.italian.login, testUsers.italian.isoCode)
    })

    it('german customer should get german shipping context', async () => {
        testFactory(testUsers.german.login, testUsers.german.isoCode)
    });


})
