import { Got } from "got";

interface SwitchContextParam {
    paymentMethodId?: string,
    shippingMethodId?: string,
}

const getShippingMethods = async (client: Got): Promise<{}> => {
    const url = 'shipping-method'

    const { body } = await client.post(url, {
        json: {
            "includes": {
                "shipping_method": ["id", "name", "active"],
            }
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
    getShippingMethods,
    switchContext
}