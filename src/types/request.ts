export interface SignUpData {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  hasAcceptedGdpr: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface FoundItemRequest {
  title: string;
  description: string;
  image: File;
  latitude: number | null;
  longitude: number | null;
  city: string;
  country: string;
  relevantDate: Date;
  categoryId: number | undefined;
}

export interface SearchAnnounceFilter {
  search?: string;
  categoryId?: number | undefined;
}

export interface NewMessageRequest {
  message: string;
}
