export interface RouteDefinition {
    title: string;
    pathname: string;                   // "/announces/[id]/discussion/[discussionId]"
    params?: Record<string, string>;    // { id: '123', discussionId: '456' }
}