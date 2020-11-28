import { AuthResponse, getAuthToken, apiClientFactory } from './rest-api';
import { ShippingMethodsClient } from './shipping-methods';
import { Got } from 'got';
import { APIClient } from './api-client.class';


const getShippingMethodsClient = async (): Promise<ShippingMethodsClient> => {
    const client: Got = await apiClientFactory();
    return new ShippingMethodsClient(client)
}

export {
    getShippingMethodsClient
}