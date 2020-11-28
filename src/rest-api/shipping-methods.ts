import { Got } from 'got';
import { APIClient } from './api-client.class';

interface ShippingMethod {
    name: string,
    id: string,
}

class ShippingMethodsClient extends APIClient {

    async getAllShippingMethods() {
        const url = 'shipping-method'
        const { body } = await this.restApiClient.get<{ data: ShippingMethod[] }>(url);

        return body
    }
}

export {
    ShippingMethodsClient
}