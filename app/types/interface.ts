export interface RouteDefinition {
    title: string;
    pathname: string; // e.g. "/announces/[id]/discussion/[discussionId]"
    params: Record<string, string>; // { id: '123', discussionId: '456' }
}