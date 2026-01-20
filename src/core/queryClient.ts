import { QueryClient } from "@tanstack/react-query";
import { minutesToMilliseconds } from "../utils/timeUtil";

const staleTime = minutesToMilliseconds(5);
const gcTime = minutesToMilliseconds(10);

/**
 * React query client global configuration
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: staleTime,
      gcTime: gcTime,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: false,
    },
    mutations: {
      // Retry mutations only on network errors
      retry: (failureCount, error: any) => {
        if (error?.message?.includes("network")) {
          return failureCount < 2;
        }
        return false;
      },
    },
  },
});

/**
 * Function to invalidate all queries
 */
export const invalidateAllQueries = () => {
  return queryClient.invalidateQueries();
};

export default queryClient;
