import { AMOUNT_PER_PAGE } from '@env';
import { ApiResponse } from "../types/api-interface";
import { Image } from "../types/app";
import { Announce } from "../types/dto";
import { FoundItemRequest } from "../types/request";
import { buildUrl, request, uploadMultipart } from "./base-api-service";

const ENDPOINTS = {
    listFoundAnnounce: '/api/announces/found/paginated',
    newFoundAnnounce: '/api/announces/found/new',
}

export const createNewFoundAnnounce = async (data: FoundItemRequest, image: Image, userToken: string): Promise<Announce> => {
    const fields = {
        title: data.title,
        description: data.description,
        latitude: String(data.latitude),
        longitude: String(data.longitude),
        city: data.city,
        country: data.country,
        relevantDate: data.relevantDate.toISOString().split('T')[0],
        categoryId: String(data.categoryId),
    }

    const response = await uploadMultipart({
        url: buildUrl(ENDPOINTS.newFoundAnnounce),
        image: image,
        fields: fields,
        token: userToken,
        fieldName: "image"
    });
    const responseBody = JSON.parse(response.body) as ApiResponse;
    return await responseBody.data
}

export const getPaginatedFoundAnnounce = async (page: number) => {
    console.log("entering get paginated func")
    page = Number.isInteger(page) && page >= 0 ? page : 0;
    const size = AMOUNT_PER_PAGE;
    const response = await request(
        ENDPOINTS.listFoundAnnounce,
        { method: 'GET' },
        { page, size }
    );
    if (!response.success) {
        throw new Error(response.message || 'Failed to retrieve found announces');
    }
    console.log(response)
    return await response.data;
}