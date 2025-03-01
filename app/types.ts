export interface DiffStats {
  files_changed: number;
  insertions: number;
  deletions: number;
}

export interface StagedChanges {
  added: string[];
  modified: string[];
  deleted: string[];
  renamed: [string, string][];
  stats: DiffStats;
}

export interface CommitRequest {
  changes: StagedChanges;
  diff: string;
  count?: number;
}

export interface CommitResponse {
  message: string;
}

export interface SuggestionsResponse {
  suggestions: string[];
}

export interface CommandRequest {
  description: string;
}

export interface CommandResponse {
  suggestion: string;
}

export interface HealthResponse {
  status: string;
  version: string;
}

export interface AnthropicMessage {
  role: string;
  content: AnthropicContent[];
}

export interface AnthropicContent {
  type: string;
  text: string;
}

export interface AnthropicRequest {
  model: string;
  max_tokens: number;
  temperature: number;
  system: string;
  messages: AnthropicMessage[];
}

export interface AnthropicResponseContent {
  type: string;
  text: string;
}

export interface AnthropicResponse {
  content: AnthropicResponseContent[];
}
