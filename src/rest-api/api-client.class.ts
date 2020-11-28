import { Got } from 'got';

export class APIClient {
    constructor(protected restApiClient: Got) { }
}