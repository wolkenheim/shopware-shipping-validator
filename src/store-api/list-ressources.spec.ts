import { Got } from 'got'
import { getLoggedInUserClient, logoutCurrentUser } from './auth'
import { testUsers } from '../config'
import { switchContext, getAvailableShippingMethods } from './context'

describe('list api ressources', () => {
    let client: Got;
    const currentTestUser = testUsers.italian;

    beforeEach(async () => {
        client = await getLoggedInUserClient(currentTestUser.login);
    })


    afterAll(async () => {
        await logoutCurrentUser(client);
    })

    it('list available shipping methods for cart of current user. Italian user with no products in cart.', async () => {
        const availableShippingMethods = await getAvailableShippingMethods(client)
        console.log("availableShippingMethods")
        console.log(availableShippingMethods)
    })
})