import { Got } from 'got';

interface SearchResultProduct {
    name: string,
    id: string,
}

interface SearchResult {
    total: number,
    elements: SearchResultProduct[]
}

const searchOrders = async (client: Got, searchTerm: string): Promise<SearchResult> => {
    const url = 'search/order'

    const { body } = await client.post<SearchResult>(url, {
        json: {
            "limit": 10,
            "query": [
                {
                    "score": 500,
                    "query": { "type": "equals", "field": "salesChannelId", "value": "57d0d82174424ac69c4129dc1e50a2c4" }
                }
            ],
            "includes": {
                "product": ["id", "name"]
            }
        }
    });

    return body
}

export {
    searchOrders
}