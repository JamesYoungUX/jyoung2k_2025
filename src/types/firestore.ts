// Firestore document types based on your data structure

export interface FirestoreDocument {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any;
}

// Base content type for root-level documents
export interface ContentDocument extends FirestoreDocument {
  title?: string;
  description?: string;
  content?: string;
  status?: 'published' | 'draft' | 'archived';
  tags?: string[];
  category?: string;
  author?: string;
  slug?: string;
  featured?: boolean;
  metadata?: Record<string, any>;
}

// Type for array items within documents
export interface ArrayItem {
  id?: string;
  value: any;
  order?: number;
  type?: string;
  metadata?: Record<string, any>;
}

// Generic type for documents containing arrays
export interface DocumentWithArrays extends FirestoreDocument {
  items?: ArrayItem[];
  list?: any[];
  data?: any[];
  elements?: any[];
}

// Firestore query types
export interface FirestoreQueryOptions {
  limit?: number;
  orderBy?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  where?: {
    field: string;
    operator: '==' | '!=' | '<' | '<=' | '>' | '>=' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in';
    value: any;
  }[];
  startAfter?: any;
  endBefore?: any;
}

// API response types
export interface FirestoreResponse<T> {
  data: T[];
  hasMore: boolean;
  lastDoc?: any;
  error?: string;
}

export interface SingleDocResponse<T> {
  data: T | null;
  error?: string;
}

// Hook return types
export interface UseFirestoreCollection<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

export interface UseFirestoreDocument<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

// Pagination types
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface LoadingState {
  initial: boolean;
  refresh: boolean;
  loadMore: boolean;
}
