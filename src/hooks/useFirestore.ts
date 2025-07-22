import { useState, useEffect, useCallback } from "react";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
  where,
  startAfter,
  onSnapshot,
  QueryConstraint,
  type DocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type {
  FirestoreQueryOptions,
  UseFirestoreCollection,
  UseFirestoreDocument,
  FirestoreDocument,
} from "../types/firestore";

// Hook for fetching a collection with real-time updates
export function useFirestoreCollection<T extends FirestoreDocument>(
  collectionName: string,
  options: FirestoreQueryOptions = {},
  realtime = false,
): UseFirestoreCollection<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const buildQuery = useCallback(
    (isLoadMore = false) => {
      const collectionRef = collection(db, collectionName);
      const constraints: QueryConstraint[] = [];

      // Add where clauses
      if (options.where) {
        options.where.forEach((whereClause) => {
          constraints.push(
            where(whereClause.field, whereClause.operator, whereClause.value),
          );
        });
      }

      // Add orderBy
      if (options.orderBy) {
        constraints.push(
          orderBy(options.orderBy.field, options.orderBy.direction),
        );
      }

      // Add pagination
      if (options.limit) {
        constraints.push(limit(options.limit));
      }

      // Add cursor for load more
      if (isLoadMore && lastDoc) {
        constraints.push(startAfter(lastDoc));
      }

      return query(collectionRef, ...constraints);
    },
    [collectionName, options, lastDoc],
  );

  const fetchData = useCallback(
    async (isLoadMore = false) => {
      try {
        setError(null);
        if (!isLoadMore) setLoading(true);

        const q = buildQuery(isLoadMore);
        const querySnapshot = await getDocs(q);

        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];

        if (isLoadMore) {
          setData((prevData) => [...prevData, ...newData]);
        } else {
          setData(newData);
        }

        // Update pagination state
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastDoc(lastVisible || null);
        setHasMore(newData.length === (options.limit || 25));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching Firestore data:", err);
      } finally {
        setLoading(false);
      }
    },
    [buildQuery, options.limit],
  );

  const setupRealtimeListener = useCallback(() => {
    const q = buildQuery();

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];

        setData(newData);
        setLoading(false);
        setError(null);

        // Update pagination state
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastDoc(lastVisible || null);
        setHasMore(newData.length === (options.limit || 25));
      },
      (err) => {
        setError(err.message);
        setLoading(false);
        console.error("Error in Firestore listener:", err);
      },
    );

    return unsubscribe;
  }, [buildQuery, options.limit]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;

    if (realtime) {
      unsubscribe = setupRealtimeListener();
    } else {
      fetchData();
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [realtime, setupRealtimeListener, fetchData]);

  const refresh = useCallback(async () => {
    setLastDoc(null);
    setHasMore(true);
    await fetchData();
  }, [fetchData]);

  const loadMore = useCallback(async () => {
    if (hasMore && !loading) {
      await fetchData(true);
    }
  }, [fetchData, hasMore, loading]);

  return {
    data,
    loading,
    error,
    refresh,
    hasMore,
    loadMore,
  };
}

// Hook for fetching a single document
export function useFirestoreDocument<T extends FirestoreDocument>(
  collectionName: string,
  documentId: string,
  realtime = false,
): UseFirestoreDocument<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocument = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData({
          id: docSnap.id,
          ...docSnap.data(),
        } as T);
      } else {
        setData(null);
        setError("Document not found");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching document:", err);
    } finally {
      setLoading(false);
    }
  }, [collectionName, documentId]);

  const setupRealtimeListener = useCallback(() => {
    const docRef = doc(db, collectionName, documentId);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setData({
            id: docSnap.id,
            ...docSnap.data(),
          } as T);
        } else {
          setData(null);
          setError("Document not found");
        }
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
        console.error("Error in document listener:", err);
      },
    );

    return unsubscribe;
  }, [collectionName, documentId]);

  useEffect(() => {
    if (!documentId) {
      setData(null);
      setLoading(false);
      return;
    }

    let unsubscribe: Unsubscribe | undefined;

    if (realtime) {
      unsubscribe = setupRealtimeListener();
    } else {
      fetchDocument();
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [realtime, setupRealtimeListener, fetchDocument, documentId]);

  const refresh = useCallback(async () => {
    if (documentId) {
      await fetchDocument();
    }
  }, [fetchDocument, documentId]);

  return {
    data,
    loading,
    error,
    refresh,
  };
}

// Utility hook for array operations within documents
export function useFirestoreArrays<T>(
  collectionName: string,
  documentId: string,
  arrayField: string = "items",
) {
  const {
    data: document,
    loading,
    error,
    refresh,
  } = useFirestoreDocument<any>(collectionName, documentId, true);

  const arrayData: T[] = document?.[arrayField] || [];

  return {
    data: arrayData,
    document,
    loading,
    error,
    refresh,
  };
}
