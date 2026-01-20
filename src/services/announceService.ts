import Constants from "expo-constants";
import { Image } from "../types/app";
import { Announce } from "../types/dto";
import { FoundItemRequest, SearchAnnounceFilter } from "../types/request";
import { buildUrl, request, uploadMultipart } from "./base-api-service";

const AMOUNT_PER_PAGE = Constants.expoConfig?.extra?.AMOUNT_PER_PAGE || "10";

const ENDPOINTS = {
  announceDetails: "/api/announces/",
  listFoundAnnounce: "/api/announces/found/paginated",
  newFoundAnnounce: "/api/announces/found/new",
};

/**
 * format the filter for announces to return the appropriate filter object based on raw inputs
 * @param filter raw filter object from form
 * @returns filter after validation
 */
export const formatFilterFromForm = (
  filter: SearchAnnounceFilter = {},
): SearchAnnounceFilter => {
  const searchIsValid =
    typeof filter.search === "string" && filter.search.length > 0;
  const categoryIsValid =
    typeof filter.categoryId === "number" &&
    Number.isInteger(filter.categoryId) &&
    filter.categoryId > 0;
  if (!searchIsValid && !categoryIsValid) {
    return {};
  }
  if (!categoryIsValid) {
    return { search: filter.search };
  }
  return {
    search: filter.search,
    categoryId: filter.categoryId,
  };
};

/**
 * sends request to the API to create a new announce for found item based on data submitted
 * @param data form data
 * @param image Image associated with the found item
 * @param userToken token of active user
 * @returns Created Announce
 */
export const createNewFoundAnnounce = async (
  data: FoundItemRequest,
  image: Image,
  userToken: string,
): Promise<Announce> => {
  const fields = {
    title: data.title,
    description: data.description,
    latitude: String(data.latitude),
    longitude: String(data.longitude),
    city: data.city,
    country: data.country,
    relevantDate: data.relevantDate.toISOString().split("T")[0],
    categoryId: String(data.categoryId),
  };

  const response = await uploadMultipart({
    url: buildUrl(ENDPOINTS.newFoundAnnounce),
    image: image,
    fields: fields,
    token: userToken,
    fieldName: "image",
  });

  if (!response.success) {
    throw new Error(response.message || "Failed to create found announce");
  }

  return await response.data;
};

/**
 * get page of found announces
 * @param page page requested
 * @param filter title query and category filter
 * @returns Api response containing the results
 */
export const getPaginatedFoundAnnounce = async (
  page: number,
  filter: SearchAnnounceFilter = {},
) => {
  page = Number.isInteger(page) && page >= 0 ? page : 0;
  const size = AMOUNT_PER_PAGE;
  const params: Record<string, string | number> = {
    page,
    size,
    ...filter,
  };
  const response = await request(
    ENDPOINTS.listFoundAnnounce,
    { method: "GET" },
    params,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to retrieve found announces");
  }
  return await response.data;
};

/**
 * get data relating to a specific announce
 * @param id uuid of announce
 * @returns api response with the data
 */
export const getAnnounceDetails = async (id: string) => {
  const requestUri = `${ENDPOINTS.announceDetails}${id}`;
  const response = await request(requestUri, { method: "GET" });
  if (!response.success) {
    throw new Error(response.message || "Failed to retrieve announce data");
  }
  return await response.data;
};
