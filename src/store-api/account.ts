import { Got } from "got";

interface AccountAddressResponse {
    total: number,
    elements: AccountAddress[]
}

interface AccountAddress {
    customerId: string,
    vatId: string,
    country: {
        name: string,
        iso: string,
        id: string
    }
}

const getCustomerAddresses = async (client: Got): Promise<AccountAddressResponse> => {
    const url = 'account/list-address'

    const { body } = await client.post<AccountAddressResponse>(url, {
        json: {}
    });

    return body;
}

const getCustomer = async (client: Got): Promise<{}> => {
    const url = 'account/customer'

    const { body } = await client.post(url, {
        json: {}
    });

    return body;
}

export {
    getCustomerAddresses,
    getCustomer,
    AccountAddress,
    AccountAddressResponse
}