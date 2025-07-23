import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  writeBatch,
  serverTimestamp,
  type QueryConstraint,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type {
  FirestoreQueryOptions,
  FirestoreDocument,
} from "../types/firestore";

// Generic CRUD Operations
export class FirestoreService {
  // Create a new document
  static async create<T extends Partial<FirestoreDocument>>(
    collectionName: string,
    data: T,
  ): Promise<string> {
    try {
      const collectionRef = collection(db, collectionName);
      const docData = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collectionRef, docData);
      return docRef.id;
    } catch (error) {
      console.error("Error creating document:", error);
      throw new Error(
        `Failed to create document: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Read a single document
  static async read<T extends FirestoreDocument>(
    collectionName: string,
    documentId: string,
  ): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        } as T;
      }

      return null;
    } catch (error) {
      console.error("Error reading document:", error);
      throw new Error(
        `Failed to read document: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Update a document
  static async update<T extends Partial<FirestoreDocument>>(
    collectionName: string,
    documentId: string,
    data: T,
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      const updateData = {
        ...data,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error("Error updating document:", error);
      throw new Error(
        `Failed to update document: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Delete a document
  static async delete(
    collectionName: string,
    documentId: string,
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document:", error);
      throw new Error(
        `Failed to delete document: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Query multiple documents
  static async query<T extends FirestoreDocument>(
    collectionName: string,
    options: FirestoreQueryOptions = {},
  ): Promise<T[]> {
    try {
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

      // Add limit
      if (options.limit) {
        constraints.push(limit(options.limit));
      }

      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
    } catch (error) {
      console.error("Error querying documents:", error);
      throw new Error(
        `Failed to query documents: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Batch operations
  static async batchWrite(
    operations: Array<{
      type: "create" | "update" | "delete";
      collection: string;
      id?: string;
      data?: DocumentData;
    }>,
  ): Promise<void> {
    try {
      const batch = writeBatch(db);

      operations.forEach((operation) => {
        const docRef = operation.id
          ? doc(db, operation.collection, operation.id)
          : doc(collection(db, operation.collection));

        switch (operation.type) {
          case "create":
            if (operation.data) {
              batch.set(docRef, {
                ...operation.data,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
              });
            }
            break;
          case "update":
            if (operation.data) {
              batch.update(docRef, {
                ...operation.data,
                updatedAt: serverTimestamp(),
              });
            }
            break;
          case "delete":
            batch.delete(docRef);
            break;
        }
      });

      await batch.commit();
    } catch (error) {
      console.error("Error in batch operation:", error);
      throw new Error(
        `Batch operation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}

// Array manipulation utilities
export class ArrayUtils {
  // Add item to document array
  static async addToArray<T>(
    collectionName: string,
    documentId: string,
    arrayField: string,
    item: T,
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentData = docSnap.data();
        const currentArray = currentData[arrayField] || [];

        await updateDoc(docRef, {
          [arrayField]: [...currentArray, item],
          updatedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error adding to array:", error);
      throw new Error(
        `Failed to add to array: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Remove item from document array
  static async removeFromArray(
    collectionName: string,
    documentId: string,
    arrayField: string,
    itemIndex: number,
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentData = docSnap.data();
        const currentArray = currentData[arrayField] || [];

        if (itemIndex >= 0 && itemIndex < currentArray.length) {
          currentArray.splice(itemIndex, 1);

          await updateDoc(docRef, {
            [arrayField]: currentArray,
            updatedAt: serverTimestamp(),
          });
        }
      }
    } catch (error) {
      console.error("Error removing from array:", error);
      throw new Error(
        `Failed to remove from array: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Update item in document array
  static async updateArrayItem<T>(
    collectionName: string,
    documentId: string,
    arrayField: string,
    itemIndex: number,
    updatedItem: T,
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentData = docSnap.data();
        const currentArray = currentData[arrayField] || [];

        if (itemIndex >= 0 && itemIndex < currentArray.length) {
          currentArray[itemIndex] = updatedItem;

          await updateDoc(docRef, {
            [arrayField]: currentArray,
            updatedAt: serverTimestamp(),
          });
        }
      }
    } catch (error) {
      console.error("Error updating array item:", error);
      throw new Error(
        `Failed to update array item: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}

// Search and filter utilities
export class SearchUtils {
  // Simple text search (case-insensitive)
  static async searchByField<T extends FirestoreDocument>(
    collectionName: string,
    fieldName: string,
    searchTerm: string,
    options: Omit<FirestoreQueryOptions, "where"> = {},
  ): Promise<T[]> {
    try {
      // Firestore doesn't support full-text search natively
      // This is a simple implementation that searches for exact matches
      const results = await FirestoreService.query<T>(collectionName, {
        ...options,
        where: [
          {
            field: fieldName,
            operator: ">=",
            value: searchTerm,
          },
          {
            field: fieldName,
            operator: "<=",
            value: searchTerm + "\uf8ff",
          },
        ],
      });

      return results;
    } catch (error) {
      console.error("Error searching documents:", error);
      throw new Error(
        `Search failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }



  // Filter by multiple conditions
  static async advancedFilter<T extends FirestoreDocument>(
    collectionName: string,
    filters: Array<{
      field: string;
      operator:
        | "=="
        | "!="
        | "<"
        | "<="
        | ">"
        | ">="
        | "array-contains"
        | "in"
        | "array-contains-any"
        | "not-in";
      value: unknown;
    }>,
    options: Omit<FirestoreQueryOptions, "where"> = {},
  ): Promise<T[]> {
    try {
      return await FirestoreService.query<T>(collectionName, {
        ...options,
        where: filters,
      });
    } catch (error) {
      console.error("Error filtering documents:", error);
      throw new Error(
        `Filter failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}

// Pagination utilities
export class PaginationUtils {
  // Get paginated results
  static async getPaginatedResults<T extends FirestoreDocument>(
    collectionName: string,
    pageSize: number = 25,
    lastDocument?: QueryDocumentSnapshot,
    options: Omit<FirestoreQueryOptions, "limit"> = {},
  ): Promise<{
    data: T[];
    lastDoc: QueryDocumentSnapshot | null;
    hasMore: boolean;
  }> {
    try {
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
      constraints.push(limit(pageSize + 1)); // Get one extra to check if there are more

      // Add cursor
      if (lastDocument) {
        constraints.push(startAfter(lastDocument));
      }

      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs;

      const hasMore = docs.length > pageSize;
      const data = docs.slice(0, pageSize).map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];

      const lastDoc = data.length > 0 ? docs[data.length - 1] : null;

      return {
        data,
        lastDoc,
        hasMore,
      };
    } catch (error) {
      console.error("Error getting paginated results:", error);
      throw new Error(
        `Pagination failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}

// Export all utilities
export { FirestoreService as default };
