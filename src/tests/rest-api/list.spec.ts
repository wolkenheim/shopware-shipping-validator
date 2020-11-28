import { AuthResponse, getAuthToken, apiClientFactory } from '../../rest-api/rest-api';
import { ShippingMethodsClient } from '../../rest-api/shipping-methods';
import { getShippingMethodsClient } from '../../rest-api/factory'

import { Got } from 'got';

describe('list', () => {
    it('all shipping methods', async () => {
        const shippingClient: ShippingMethodsClient = await getShippingMethodsClient()

        const allShippingMethods = await shippingClient.getAllShippingMethods()
        console.log("allShippingMethods")

        const mapped = allShippingMethods.data.map(shipping => ({ name: shipping.name, id: shipping.id }))
        console.table(mapped)

    })
})