// types/index.ts 
export interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

export function safeParse<T>(data: unknown, fallback: T): T {
  if (!data) return fallback;
  if (typeof data === 'object') return data as T;
  try {
    return JSON.parse(data as string);
  } catch {
    return fallback;
  }
}

export function isAppwriteDocument(obj: unknown): obj is AppwriteDocument {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    '$id' in obj &&
    '$createdAt' in obj &&
    '$updatedAt' in obj
  );
}