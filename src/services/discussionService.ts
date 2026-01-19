import Constants from "expo-constants";
import {
    NewMessageRequest
} from "../types/request";
import { formatStringTemplate } from "../utils/stringUtil";
import { request } from "./base-api-service";

const AMOUNT_PER_PAGE = Constants.expoConfig?.extra?.AMOUNT_PER_PAGE || "10";

const ENDPOINTS = {
  newDiscussion: "/api/announces/:id/discussions/new",
  listAnnounceDiscussions: "/api/announces/:id/discussions",
  getExistingAnnounceDiscussionForResponder:
    "/api/announces/:id/discussions/private",
  getDiscussion: "/api/discussions/:id",
};

export const createNewDiscussion = async (
  announceId: string,
  payload: NewMessageRequest,
  userToken: string,
): Promise<any> => {
  const requestUrl = formatStringTemplate(ENDPOINTS.newDiscussion, {
    id: announceId,
  });
  const response = await request(requestUrl, {
    method: "POST",
    headers: { Authorization: `Bearer ${userToken}` },
    body: JSON.stringify(payload),
  });
  if (!response.success) {
    console.log(
      `Error : ${response.message || "an unexpected error occured while creating new discussion"}`,
    );
  }
  return await response.data;
};

export const getAllAnnounceDiscussions = async (
  announceId: string,
  userToken: string,
): Promise<any> => {
  const requestUrl = formatStringTemplate(ENDPOINTS.listAnnounceDiscussions, {
    id: announceId,
  });
  const response = await request(requestUrl, {
    method: "GET",
    headers: { Authorization: `Bearer ${userToken}` },
  });
  if (!response.success) {
    console.log(
      `Error : ${response.message || "an unexpected error occured while getting discussion list"}`,
    );
  }
  return await response.data;
};

export const getExistingResponderDiscussionForAnnounce = async (
  announceId: string,
  userToken: string,
): Promise<any> => {
  const requestUrl = formatStringTemplate(
    ENDPOINTS.getExistingAnnounceDiscussionForResponder,
    { id: announceId },
  );
  const response = await request(requestUrl, {
    method: "GET",
    headers: { Authorization: `Bearer ${userToken}` },
  });
  if (!response.success) {
    console.log(
      `Error : ${response.message || "an unexpected error occured while getting existing discussion for current user"}`,
    );
  }
  return await response.data;
};

export const getDiscussion = async (
  discussionId: string,
  userToken: string,
): Promise<any> => {
  const requestUrl = formatStringTemplate(ENDPOINTS.listAnnounceDiscussions, {
    id: discussionId,
  });
  const response = await request(requestUrl, {
    method: "GET",
    headers: { Authorization: `Bearer ${userToken}` },
  });
  if (!response.success) {
    console.log(
      `Error : ${response.message || "an unexpected error occured while getting existing discussion for current user"}`,
    );
  }
  return await response.data;
};
