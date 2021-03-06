import { Got } from 'got'
import { StoreApiAuthResponse, apiClientFactory, getAuthToken, getUserLoginToken } from '../../store-api/auth'
import { testUsers } from '../../config'

import { searchProducts, SearchResult } from '../../store-api/product'


describe('Search Product', () => {

    const currentTestUser = testUsers.german;

    it('should find one article', async () => {

        const authResponse: StoreApiAuthResponse = await getAuthToken()
        let client: Got = apiClientFactory(authResponse.token);

        // get user login client and overwrite first token
        const userLoginToken: string = await getUserLoginToken(client, currentTestUser.login);
        client = apiClientFactory(userLoginToken);

        const testProduct = 'EDER - FassStolz® 100 l'
        let products: SearchResult = await searchProducts(client, testProduct)

        console.log(products.elements[0]['id']);

        expect(products.total).toBe(1);
        expect(products.elements[0]['name']).toBe(testProduct)
    })

})
