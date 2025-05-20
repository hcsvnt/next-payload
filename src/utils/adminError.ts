import { APIError } from 'payload';

export class CustomError extends APIError {
    constructor(message: string, code = 400) {
        super(message, code, undefined, true);
    }
}
