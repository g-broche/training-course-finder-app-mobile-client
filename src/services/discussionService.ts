import { DetailedDiscussion, Discussion } from "../types/dto";
import { NewMessageRequest } from "../types/request";
import { request } from "./base-api-service";

const ENDPOINTS = {
  newDiscussion: (idAnnounce: string) =>
    `/api/announces/${idAnnounce}/discussions/new`,
  addMessage: (idDiscussion: string) =>
    `/api/discussions/${idDiscussion}/messages/new`,
  listAnnounceDiscussions: (idAnnounce: string) =>
    `/api/announces/${idAnnounce}/discussions`,
  getDiscussion: (idDiscussion: string) => `/api/discussions/${idDiscussion}`,
  reportMessage: (idDiscussion: string, idMessage: string) =>
    `/api/discussions/${idDiscussion}/messages/${idMessage}/report`,
};

export const createNewDiscussion = async (
  announceId: string,
  payload: NewMessageRequest,
): Promise<any> => {
  const requestUrl = ENDPOINTS.newDiscussion(announceId);

  const response = await request(requestUrl, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!response.success || response.data == null) {
    throw new Error(
      response.message ||
        "an unexpected error occured while creating new discussion",
    );
  }
  return response.data;
};

export const getAllAnnounceDiscussions = async (
  announceId: string,
): Promise<Discussion[]> => {
  const requestUrl = ENDPOINTS.listAnnounceDiscussions(announceId);

  const response = await request(requestUrl, {
    method: "GET",
  });
  if (!response.success || response.data == null) {
    throw new Error(
      response.message ||
        "an unexpected error occured while getting discussion list",
    );
  }
  return response.data;
};

export const getDiscussion = async (
  discussionId: string,
): Promise<DetailedDiscussion> => {
  const requestUrl = ENDPOINTS.getDiscussion(discussionId);

  const response = await request(requestUrl, {
    method: "GET",
  });
  if (!response.success || response.data == null) {
    throw new Error(
      response.message ||
        "an unexpected error occured while getting existing discussion for current user",
    );
  }
  return response.data;
};

export const addMessage = async (
  discussionId: string,
  message: NewMessageRequest,
): Promise<DetailedDiscussion> => {
  const requestUrl = ENDPOINTS.addMessage(discussionId);
  console.log("endpoint", requestUrl);

  const response = await request(requestUrl, {
    method: "POST",
    body: JSON.stringify(message),
  });
  if (!response.success || response.data == null) {
    throw new Error(
      response.message ||
        "an unexpected error occured while adding message to discussion",
    );
  }
  return response.data;
};

export const reportMessage = async (
  discussionId: string,
  messageId: string,
): Promise<string> => {
  const requestUrl = ENDPOINTS.reportMessage(discussionId, messageId);

  const response = await request(requestUrl, {
    method: "POST",
  });
  if (!response.success) {
    throw new Error(
      response.message ||
        "an unexpected error occured while getting discussion list",
    );
  }
  return response.message || "Message reported";
};
