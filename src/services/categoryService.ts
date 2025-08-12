import { ApiResponse } from "../types/api-interface";
import { Category } from "../types/dto";
import { request } from "./base-api-service";

const ENDPOINTS = {
    list: '/api/categories',
}

export const getAllCategories = async (): Promise<Category[]> => {
    const response = await request(ENDPOINTS.list, {
        method: 'GET',
    });
    if (!response.success) {
        console.log(`Error : ${response.message || "an unexpected error occured getting categories"}`);
    }
    return await response.data;
}