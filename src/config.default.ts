const config = {
    baseUrl: 'http://www.myshopwareshop.com/',
    swAccessKey: 'xxxxxx', // this is the access key for the sales channel
    shopwareApiVersion: 'v3' // v3 for shopware 6.3
}

const testUsers = {
    italian: {
        isoCode: 'IT',
        login: {
            username: 'italianustomer@test.de', // email, not username
            password: 'passwordgoeshere'
        }
    },
    german: {
        isoCode: 'DE',
        login: {
            username: 'germancustomer@test.de',
            password: 'passwordgoeshere'
        }
    }
}

const addToCartTestdata = {
    shippingMethods: {
        shippingSelfPickUp: 'idgoeshere',
        shippingItaly: 'idgoeshere',
        shippingDenmark: 'idgoeshere',
        shippingGermany: 'idgoeshere'
    },
    products: {
        selectedProduct: {
            id: 'idgoeshere',
            weight: 35
        }
    }
}

const restApiConfig = {
    baseUrl: 'http://shopwareurl...',
    shopwareApiVersion: 'v3',
    clientId: 'clientid',
    clientSecret: 'secret'
}

export { config, testUsers, addToCartTestdata, restApiConfig }