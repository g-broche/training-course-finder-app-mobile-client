import { AnnounceStatus, AnnounceType, InteractivityState } from "./type";

export interface LoggedUser {
  uuid: string;
  email: string;
  roles: string[];
  firstName: string;
  lastName: string;
  displayName: string;
  isVerified: boolean;
  hasAcceptedGdpr: boolean;
  userCreatedAt: Date;
}

export interface OtherUser {
  displayName: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Announce {
  id: string;
  title: string;
  description: string;
  photo: string | null;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  relevantDate: string; // ISO format (e.g., '2025-07-23')
  type: AnnounceType;
  author: OtherUser;
  interactivityState: InteractivityState;
  status: AnnounceStatus;
  category: string;
  createdAt: string; // ISO timestamp (e.g., '2025-07-23T14:35:00Z')
  editedAt: string;
}

export interface Message {
  discussionId: string;
  announceId: string;
  index: number;
  author: OtherUser;
  content: string;
  createdAt: string; // ISO timestamp
  editedAt: string;
}

export interface Discussion {
  discussionId: string;
  announceId: string;
  announceAuthor: OtherUser;
  announceResponder: OtherUser;
  interactivityStateName: string;
  messageCount: number;
  excerpt: string;
  createdAt: string; // ISO timestamp
  editedAt: string;
}

export interface DetailedDiscussion {
  discussionId: string;
  announceId: string;
  announceAuthor: OtherUser;
  announceResponder: OtherUser;
  interactivityStateName: string;
  messages: Message[];
  createdAt: string; // ISO timestamp
  editedAt: string;
}
