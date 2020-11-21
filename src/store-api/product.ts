import got, { Got } from 'got';

interface SearchResultProduct {
    name: string,
    id: string,
}

interface SearchResult {
    total: number,
    elements: SearchResultProduct[]
}

const searchProducts = async (client: Got, searchTerm: string): Promise<SearchResult> => {
    const url = 'product'

    const { body } = await client.post<SearchResult>(url, {
        json: {
            "query": [
                {
                    "score": 500,
                    "query": { "type": "equals", "field": "name", "value": searchTerm }
                },
            ],
            "includes": {
                "product": ["id", "name"]
            }
        }
    });

    return body
}

const fetchProductById = async (client: Got, id: string): Promise<string> => {
    const url = 'product/' + id

    const { body } = await client.post(url, {
        json: {
            "includes": {
                "product": ["id", "name"]
            }
        }
    });

    return body
}


export {
    searchProducts,
    fetchProductById,
    SearchResult,
    SearchResultProduct
}
