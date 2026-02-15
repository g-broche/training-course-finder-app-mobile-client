export interface RouteDefinition {
  title: string;
  pathname: string; // "/announces/[id]/discussion/[discussionId]"
  params?: Record<string, string>; // { id: '123', discussionId: '456' }
}

export interface UploadParams {
  url: string;
  image: Image | null;
  fields: Record<string, string>;
  token: string;
  fieldName?: string;
}

export interface Image {
  uri: string;
  name: string;
  type: string;
}

export interface InstructionResult {
  isSuccess: boolean;
  message: string;
}
