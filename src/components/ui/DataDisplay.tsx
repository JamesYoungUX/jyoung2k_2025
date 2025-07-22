import React from "react";
import type { FirestoreDocument } from "../../types/firestore";
import Loading, { LoadingSkeleton, LoadingCard } from "./Loading";
import Error, { NotFoundError } from "./Error";

interface DataDisplayProps<T extends FirestoreDocument> {
  data: T[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  className?: string;
  loadingVariant?: "skeleton" | "card" | "spinner";
  showLoadingText?: boolean;
  grid?: boolean;
  gridCols?: 1 | 2 | 3 | 4 | 5 | 6;
}

const DataDisplay = <T extends FirestoreDocument>({
  data,
  loading,
  error,
  onRetry,
  renderItem,
  emptyMessage = "No items found",
  emptyIcon,
  className = "",
  loadingVariant = "skeleton",
  showLoadingText = true,
  grid = false,
  gridCols = 3,
}: DataDisplayProps<T>) => {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
  };

  if (loading) {
    const loadingCount = 6;

    if (loadingVariant === "spinner") {
      return (
        <div
          className={`flex flex-col items-center justify-center py-12 ${className}`}
        >
          <Loading
            size="lg"
            variant="spinner"
            text={showLoadingText ? "Loading data..." : undefined}
          />
        </div>
      );
    }

    if (loadingVariant === "card") {
      return (
        <div
          className={`${grid ? `grid ${gridClasses[gridCols]} gap-6` : "space-y-4"} ${className}`}
        >
          {Array.from({ length: loadingCount }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      );
    }

    // Default skeleton loading
    return (
      <div
        className={`${grid ? `grid ${gridClasses[gridCols]} gap-6` : "space-y-6"} ${className}`}
      >
        {Array.from({ length: loadingCount }).map((_, index) => (
          <div key={index} className="card">
            <LoadingSkeleton lines={4} height="h-4" className="mb-4" />
            <LoadingSkeleton lines={2} height="h-3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <Error
          title="Failed to Load Data"
          message={error}
          variant="card"
          onRetry={onRetry}
          className="max-w-md mx-auto"
        />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        {emptyIcon && (
          <div className="mx-auto h-24 w-24 text-gray-300 mb-6">
            {emptyIcon}
          </div>
        )}
        {!emptyIcon && (
          <div className="mx-auto h-24 w-24 text-gray-300 mb-6">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-full h-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data</h3>
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={`${grid ? `grid ${gridClasses[gridCols]} gap-6` : "space-y-6"} ${className}`}
    >
      {data.map((item, index) => (
        <div key={item.id || index} className="animate-fade-in">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

// Single item display component
interface SingleItemDisplayProps<T extends FirestoreDocument> {
  data: T | null;
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  render: (item: T) => React.ReactNode;
  notFoundMessage?: string;
  className?: string;
}

export const SingleItemDisplay = <T extends FirestoreDocument>({
  data,
  loading,
  error,
  onRetry,
  render,
  notFoundMessage = "Item not found",
  className = "",
}: SingleItemDisplayProps<T>) => {
  if (loading) {
    return (
      <div className={`card ${className}`}>
        <LoadingSkeleton lines={6} height="h-4" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <Error message={error} variant="card" onRetry={onRetry} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className={className}>
        <NotFoundError resource="item" onGoBack={onRetry} />
        <div className="text-center py-8 text-gray-500">
          <p>{notFoundMessage}</p>
        </div>
      </div>
    );
  }

  return <div className={className}>{render(data)}</div>;
};

// Array display component for nested arrays in Firestore documents
interface ArrayDisplayProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
  horizontal?: boolean;
  maxItems?: number;
  showMore?: boolean;
  onShowMore?: () => void;
}

export const ArrayDisplay = <T,>({
  items,
  renderItem,
  emptyMessage = "No items in this list",
  className = "",
  horizontal = false,
  maxItems,
  showMore = false,
  onShowMore,
}: ArrayDisplayProps<T>) => {
  const displayItems = maxItems ? items.slice(0, maxItems) : items;
  const hasMoreItems = maxItems && items.length > maxItems;

  if (!items || items.length === 0) {
    return (
      <div className={`text-center py-8 text-gray-500 ${className}`}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className={
          horizontal
            ? "flex space-x-4 overflow-x-auto scrollbar-hide"
            : "space-y-4"
        }
      >
        {displayItems.map((item, index) => (
          <div key={index} className={horizontal ? "flex-shrink-0" : ""}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {hasMoreItems && showMore && (
        <div className="mt-4 text-center">
          <button onClick={onShowMore} className="btn-secondary text-sm">
            Show {items.length - maxItems} more items
          </button>
        </div>
      )}
    </div>
  );
};

// Pagination controls component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  className = "",
}) => {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className={`flex items-center justify-between ${className}`}
      aria-label="Pagination"
    >
      <div className="flex justify-between flex-1 sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>

        {showPageNumbers && (
          <div className="flex space-x-1">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!canGoPrevious}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {getVisiblePages().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === "number" && onPageChange(page)}
                disabled={page === "..."}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : page === "..."
                      ? "text-gray-400 cursor-default"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!canGoNext}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DataDisplay;
