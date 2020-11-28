import { Got } from 'got'
import { getLoggedInUserClient, logoutCurrentUser } from '../../store-api/auth'
import { addItemToCartById, fetchCart } from '../../store-api/cart'
import { testUsers, addToCartTestdata } from '../../config'
import { switchContext, getAvailableShippingMethods } from '../../store-api/context'

describe('Checkout - add Product', () => {

    let client: Got;
    const currentTestUser = testUsers.italian;

    beforeEach(async () => {
        client = await getLoggedInUserClient(currentTestUser.login);

        // switch shipping method to pick up
        await switchContext(client, { shippingMethodId: addToCartTestdata.shippingMethods.shippingItaly })
    })

    afterAll(async () => {
        await logoutCurrentUser(client);
    })

    it('shipping method for wrong country should result in cart error', async () => {

        await switchContext(client, { shippingMethodId: addToCartTestdata.shippingMethods.shippingGermany })

        let itemAddedResponse = await addItemToCartById(client, addToCartTestdata.products.selectedProduct.id)
        let errorKeys = Object.keys(itemAddedResponse.errors);

        expect(errorKeys).toHaveLength(1);
        expect(errorKeys[0].substr(0, 23)).toBe("shipping-method-blocked")
    });

    it('italian customer should get two available shipping options', async () => {
        const availableShippingMethods = await getAvailableShippingMethods(client);

        // should be two shipping methods
        expect(availableShippingMethods).toHaveLength(2);

        // one of them should be italian shipping
        let italianShippingMethod = availableShippingMethods.findIndex((s) => s.id === addToCartTestdata.shippingMethods.shippingItaly)
        expect(italianShippingMethod).toBeGreaterThan(-1);
    })

    it('adding one item with 35kg weight should calculate costs correctly', async () => {

        let itemAddedResponse = await addItemToCartById(client, addToCartTestdata.products.selectedProduct.id)

        // cart delivieries country should be the one of logged in customer
        expect(itemAddedResponse!.deliveries[0].location.country.iso).toBe(currentTestUser.isoCode)

        // are there any errors? e.g. blocked shipping methods
        let errorKeys = Object.keys(itemAddedResponse.errors);
        expect(errorKeys).toHaveLength(0);

        let cart = await fetchCart(client);

        // verify that this it the shipping method we switched to earlier 
        expect(cart.deliveries[0].shippingMethod.id).toBe(addToCartTestdata.shippingMethods.shippingItaly);

        // product weight: 35 kg
        // shipping italy > 31 && < 41 kg = 141.52 gross
        const shippingPriceGrossExpected = 141.52
        const shippingUnitPrice = cart.deliveries[0].shippingCosts.unitPrice

        expect(shippingUnitPrice).toBe(shippingPriceGrossExpected)
    })

    it('adding more than 400kg for italian customer should disable regular italian shipping and enable individual calculation shipping method ', async () => {

        // 20 x 35kg = 700 kg. Individual calculation shipping method start at >= 400kg
        let itemAddedResponse = await addItemToCartById(client, addToCartTestdata.products.selectedProduct.id, 20)

        // cart delivieries country should be the one of logged in customer
        expect(itemAddedResponse!.deliveries[0].location.country.iso).toBe(currentTestUser.isoCode)

        // regular italian shipping should be blocked
        let errorKeys = Object.keys(itemAddedResponse.errors);
        expect(errorKeys).toHaveLength(1);
        expect(errorKeys[0]).toMatch("shipping-method-blocked-Italien Versand")

        const availableShippingMethods = await getAvailableShippingMethods(client);

        // one of them should be italian shipping for individual calculation of shipping costs
        let italianShippingMethod = availableShippingMethods.findIndex((s) => s.id === addToCartTestdata.shippingMethods.shippingItalyTooHeavy)
        expect(italianShippingMethod).toBeGreaterThan(-1);

    })
})
