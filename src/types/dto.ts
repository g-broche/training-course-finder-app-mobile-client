export interface LoggedUser {
    uuid: string,
    email: string,
    roles: string[],
    firstName: string,
    lastName: string,
    displayName: string,
    isVerified: boolean,
    hasAcceptedGdpr: boolean,
    userCreatedAt: Date,
};

export interface OtherUser {
    displayName: string,
};

export interface Category {
    id: number;
    name: string;
}

export interface Announce {
    id: string;
    title: string;
    description: string;
    photo: string;
    city: string;
    country: string;
    latitude: string;
    longitude: string;
    relevantDate: string; // ISO format (e.g., '2025-07-23')
    type: string;
    author: OtherUser;
    interactivityState: string;
    recordStatus: string;
    status: string;
    category: string;
    createdAt: string; // ISO timestamp (e.g., '2025-07-23T14:35:00Z')
    editedAt: string;
}