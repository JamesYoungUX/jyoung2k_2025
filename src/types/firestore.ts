// Firestore document types based on your data structure

export interface FirestoreDocument {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any;
}

// Case Study type - simplified structure with image
export interface CaseStudy extends FirestoreDocument {
  company: string;
  image?: string;
  hidden?: boolean;
  featured?: boolean;
  details?: {
    timeline?: string;
    role?: string;
    teamMembers?: string;
    platform?: string;
    methodologies?: string;
  };
  intro?: string;
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
  metadata?: Record<string, unknown>;
}

// Type for array items within documents
export interface ArrayItem {
  id?: string;
  value: unknown;
  order?: number;
  type?: string;
  metadata?: Record<string, unknown>;
}

// Generic type for documents containing arrays
export interface DocumentWithArrays extends FirestoreDocument {
  items?: ArrayItem[];
  list?: unknown[];
  data?: unknown[];
  elements?: unknown[];
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
    value: unknown;
  }[];
  startAfter?: unknown;
  endBefore?: unknown;
}

// API response types
export interface FirestoreResponse<T> {
  data: T[];
  hasMore: boolean;
  lastDoc?: unknown;
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
