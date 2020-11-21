import { Got } from "got";

interface SwitchContextParam {
    paymentMethodId?: string,
    shippingMethodId?: string,
}

interface ShippingMethod {
    id: string,
    name: string,
    active: boolean
}

const getAvailableShippingMethods = async (client: Got): Promise<ShippingMethod[]> => {
    const url = 'shipping-method'

    const { body } = await client.post<ShippingMethod[]>(url, {
        searchParams: { onlyAvailable: true },
        json: {
            "includes": {
                "shipping_method": ["id", "name", "active"],
            },
        }
    });

    return body
}

const switchContext = async (client: Got, switchContext: SwitchContextParam): Promise<{}> => {
    const url = 'context'

    const { body } = await client.patch(url, {
        json: switchContext
    });


    return body
}

export {
    getAvailableShippingMethods,
    switchContext
}