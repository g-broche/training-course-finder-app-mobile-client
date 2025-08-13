import { format, parseISO } from "date-fns";

export const formatDate = (isoString: string): string => {
    const date = parseISO(isoString);
    return format(date, 'yyyy-MM-dd HH:mm');
};