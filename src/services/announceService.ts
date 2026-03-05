import Constants from "expo-constants";
import { Image } from "../types/app";
import { Announce } from "../types/dto";
import {
    FoundItemRequest,
    LostItemRequest,
    SearchAnnounceFilter,
} from "../types/request";
import { request } from "./base-api-service";

const AMOUNT_PER_PAGE = Constants.expoConfig?.extra?.AMOUNT_PER_PAGE || 10;

const ENDPOINTS = {
  announceDetails: "/api/announces/",
  listFoundAnnounce: "/api/announces/paginated?type=found",
  newFoundAnnounce: "/api/announces/found/new",
  listLostAnnounce: "/api/announces/paginated?type=lost",
  newLostAnnounce: "/api/announces/lost/new",
  listUserAnnounces: "/api/announces/my-announces",
  listAnnouncesWithDiscussions: "/api/announces/with-discussions",
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
    typeof filter.title === "string" && filter.title.length > 0;
  const categoryIsValid =
    typeof filter.categoryId === "number" &&
    Number.isInteger(filter.categoryId) &&
    filter.categoryId > 0;
  const cityIsValid = typeof filter.city === "string" && filter.city.length > 0;

  if (!searchIsValid && !categoryIsValid && !cityIsValid) {
    return {};
  }

  const result: SearchAnnounceFilter = {};
  if (searchIsValid) result.title = filter.title;
  if (categoryIsValid) result.categoryId = filter.categoryId;
  if (cityIsValid) result.city = filter.city;

  return result;
};

/**
 * sends request to the API to create a new announce for found item based on data submitted
 * @param data form data
 * @param image Image associated with the found item
 * @returns Created Announce
 */
export const createNewFoundAnnounce = async (
  data: FoundItemRequest,
  image: Image,
): Promise<Announce> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("latitude", String(data.latitude));
  formData.append("longitude", String(data.longitude));
  formData.append("city", data.city);
  formData.append("country", data.country);
  formData.append(
    "relevantDate",
    data.relevantDate.toISOString().split("T")[0],
  );
  formData.append("categoryId", String(data.categoryId));
  formData.append("image", {
    uri: image.uri,
    type: image.type || "image/jpeg",
    name: image.name || "image.jpg",
  } as any);
  const getParams = undefined;
  const isMultipart = true;
  const response = await request(
    ENDPOINTS.newFoundAnnounce,
    {
      method: "POST",
      body: formData,
    },
    getParams,
    isMultipart,
  );

  if (!response.success) {
    throw new Error(response.message || "Failed to create found announce");
  }

  return await response.data;
};

/**
 * get page of found announces
 * @param page page requested
 * @param filter title query and category filter
 * @param size number of items per page (optional, defaults to AMOUNT_PER_PAGE)
 * @returns Api response containing the results
 */
export const getPaginatedFoundAnnounce = async (
  page: number,
  filter: SearchAnnounceFilter = {},
  size?: number,
) => {
  page = Number.isInteger(page) && page >= 0 ? page : 0;
  const pageSize =
    size && Number.isInteger(size) && size > 0 ? size : AMOUNT_PER_PAGE;
  const params: Record<string, string | number> = {
    page,
    size: pageSize,
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

/**
 * sends request to the API to create a new announce for lost item based on data submitted
 * @param data form data
 * @param image Image associated with the lost item (optional)
 * @returns Created Announce
 */
export const createNewLostAnnounce = async (
  data: LostItemRequest,
  image: Image | null,
): Promise<Announce> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("latitude", String(data.latitude));
  formData.append("longitude", String(data.longitude));
  formData.append("city", data.city);
  formData.append("country", data.country);
  formData.append(
    "relevantDate",
    data.relevantDate.toISOString().split("T")[0],
  );
  formData.append("categoryId", String(data.categoryId));

  if (image) {
    formData.append("image", {
      uri: image.uri,
      type: image.type || "image/jpeg",
      name: image.name || "image.jpg",
    } as any);
  }

  const getParams = undefined;
  const isMultipart = true;
  const response = await request(
    ENDPOINTS.newLostAnnounce,
    {
      method: "POST",
      body: formData,
    },
    getParams,
    isMultipart,
  );

  if (!response.success) {
    throw new Error(response.message || "Failed to create lost announce");
  }

  return await response.data;
};

/**
 * get page of lost announces
 * @param page page requested
 * @param filter title query and category filter
 * @param size number of items per page (optional, defaults to AMOUNT_PER_PAGE)
 * @returns Api response containing the results
 */
export const getPaginatedLostAnnounce = async (
  page: number,
  filter: SearchAnnounceFilter = {},
  size?: number,
) => {
  page = Number.isInteger(page) && page >= 0 ? page : 0;
  const pageSize =
    size && Number.isInteger(size) && size > 0 ? size : AMOUNT_PER_PAGE;
  const params: Record<string, string | number> = {
    page,
    size: pageSize,
    ...filter,
  };
  const response = await request(
    ENDPOINTS.listLostAnnounce,
    { method: "GET" },
    params,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to retrieve lost announces");
  }
  return await response.data;
};

/**
 * get page of user's announces
 * @param page page requested
 * @param size number of items per page (optional, defaults to AMOUNT_PER_PAGE)
 * @returns Api response containing the results
 */
export const getPaginatedUserAnnounces = async (
  page: number,
  size?: number,
) => {
  page = Number.isInteger(page) && page >= 0 ? page : 0;
  const pageSize =
    size && Number.isInteger(size) && size > 0 ? size : AMOUNT_PER_PAGE;
  const params: Record<string, string | number> = {
    page,
    size: pageSize,
  };
  const response = await request(
    ENDPOINTS.listUserAnnounces,
    { method: "GET" },
    params,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to retrieve user announces");
  }
  return await response.data;
};

/**
 * get page of announces where current user has discussions
 * @param page page requested
 * @param size number of items per page (optional, defaults to AMOUNT_PER_PAGE)
 * @returns Api response containing the results
 */
export const getPaginatedAnnounceWithDiscussions = async (
  page: number,
  size?: number,
) => {
  page = Number.isInteger(page) && page >= 0 ? page : 0;
  const pageSize =
    size && Number.isInteger(size) && size > 0 ? size : AMOUNT_PER_PAGE;
  const params: Record<string, string | number> = {
    page,
    size: pageSize,
  };
  const response = await request(
    ENDPOINTS.listAnnouncesWithDiscussions,
    { method: "GET" },
    params,
  );
  if (!response.success) {
    throw new Error(
      response.message ||
        "Failed to retrieve announces with discussions for current user",
    );
  }
  return await response.data;
};

/**
 * Update the status of an announce
 * @param announceId UUID of the announce
 * @param announceStatus New status ("solved" | "unsolved")
 * @returns Api response
 */
export const updateAnnounceStatus = async (
  announceId: string,
  announceStatus: "solved" | "unsolved",
) => {
  const requestUri = `/api/announces/${announceId}/update/status`;
  const response = await request(requestUri, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ announceStatus }),
  });
  if (!response.success) {
    throw new Error(response.message || "Failed to update announce status");
  }
  return await response.data;
};

/**
 * Update the interactivity state of an announce
 * @param announceId UUID of the announce
 * @param interactivityState New state ("open" | "close")
 * @returns Api response
 */
export const updateAnnounceInteractivity = async (
  announceId: string,
  interactivityState: "open" | "close",
) => {
  const requestUri = `/api/announces/${announceId}/update/interactivity`;
  const response = await request(requestUri, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ interactivityState }),
  });
  if (!response.success) {
    throw new Error(
      response.message || "Failed to update announce interactivity",
    );
  }
  return await response.data;
};
