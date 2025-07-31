import { ApiResponse } from "../types/api-interface";
import { Image } from "../types/app";
import { Announce } from "../types/dto";
import { FoundItemRequest } from "../types/request";
import { buildUrl, uploadMultipart } from "./base-api-service";

const ENDPOINTS = {
    newFoundAnnounce: '/announces/found/new',
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