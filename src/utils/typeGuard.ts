import { ApiResponse } from "../types/api-interface";

export const isApiResponse = (obj: any): obj is ApiResponse => {
    return obj
        && typeof obj === 'object'
        && typeof obj.success === 'boolean'
        && (obj.message === undefined || typeof obj.message === 'string')
        && (obj.data === undefined || typeof obj.data === 'object');
};