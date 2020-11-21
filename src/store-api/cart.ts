import { Got } from 'got';

interface AddItemsToCartResponse {
    deliveries: Delivery[],
    errors: {}
}

interface Delivery {
    shippingMethod: {
        id: string,
        name: string,
        active: string,
        prices: []
    },
    shippingCosts: {}
    location: {
        country: {
            iso: string
        }
    }
}

interface CartResponse {
    price: {
        netPrice: number,
        totalPrice: number,
        calculatedTaxes: {},
        taxRules: {},
        positionPrice: number,
        taxStatus: 'gross',
    }
    lineItems: {}[],
    deliveries: Delivery[]

}

const addItemToCartById = async (client: Got, productId: string): Promise<AddItemsToCartResponse> => {
    const url = 'checkout/cart/line-item'

    const { body } = await client.post<AddItemsToCartResponse>(url, {
        json: {
            "items": [
                {
                    "type": "product",
                    "referencedId": productId,
                    "quantity": 1
                }
            ]
        }
    });

    return body
}

const fetchCart = async (client: Got): Promise<CartResponse> => {
    const url = 'checkout/cart'

    const { body } = await client.post<CartResponse>(url, {
        json: {

        }
    });

    return body
}

export {
    addItemToCartById,
    fetchCart
}
