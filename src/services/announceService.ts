import { ApiResponse } from "../types/api-interface";
import { Announce, Category } from "../types/dto";
import { FoundItemRequest } from "../types/request";
import { axiosPostRequest, axiosPostRequestWithMultipartForm, request } from "./base-api-service";
import axios from 'axios';

const ENDPOINTS = {
    newFoundAnnounce: '/announces/found/new',
    test: '/announces/test',
}

export const createNewFoundAnnounce = async (requestData: FormData): Promise<Announce> => {
    const response = await axiosPostRequestWithMultipartForm(ENDPOINTS.newFoundAnnounce, requestData)
    return await response.data;
}

export const testNewFoundAnnounceBody = async (requestData: string): Promise<void> => {
    const response = await axiosPostRequest(ENDPOINTS.test, requestData);
}