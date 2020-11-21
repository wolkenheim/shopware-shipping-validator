import { Got } from "got"

interface ContextResponse {
    currentCustomerGroup: {},
    shippingMethod: {},
    shippingLocation: {
        country: {
            name: string,
            iso: string
            active: boolean
        }
    },
    language?: {}
    languages?: {},
}

const getContext = async (client: Got): Promise<ContextResponse> => {
    const url = 'context'

    const { body } = await client.get<ContextResponse>(url)

    return body
}

export {
    getContext,
    ContextResponse
}