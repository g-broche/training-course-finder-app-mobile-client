import { Announce } from "../types/dto"

export const isAnnounceTypeFound = (announce: Announce): boolean => {
    return announce.type === "found";
}

export const isImageIncludedInAnnounce = (announce: Announce): boolean => {
    return announce.photo != null && announce.photo.length > 0;
}