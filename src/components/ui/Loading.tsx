import React from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  className?: string;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = "md",
  variant = "spinner",
  className = "",
  text,
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const renderSpinner = () => (
    <div
      className={`loading-spinner ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );

  const renderDots = () => (
    <div
      className={`flex space-x-1 ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
    </div>
  );

  const renderPulse = () => (
    <div
      className={`bg-gray-200 rounded ${sizeClasses[size]} animate-pulse ${className}`}
      role="status"
      aria-label="Loading"
    />
  );

  const renderVariant = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  if (text) {
    return (
      <div className="flex items-center space-x-3">
        {renderVariant()}
        <span className="text-gray-600 font-medium">{text}</span>
      </div>
    );
  }

  return renderVariant();
};

// Loading skeleton component
interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  height?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = "",
  lines = 3,
  height = "h-4",
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 rounded ${height} ${
            index === lines - 1 ? "w-3/4" : "w-full"
          } ${index < lines - 1 ? "mb-2" : ""}`}
        />
      ))}
    </div>
  );
};

// Loading card component
interface LoadingCardProps {
  className?: string;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({ className = "" }) => {
  return (
    <div className={`card animate-pulse ${className}`}>
      <div className="flex items-center space-x-4">
        <div className="bg-gray-200 rounded-full h-12 w-12"></div>
        <div className="flex-1 space-y-2">
          <div className="bg-gray-200 h-4 rounded w-3/4"></div>
          <div className="bg-gray-200 h-4 rounded w-1/2"></div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="bg-gray-200 h-4 rounded"></div>
        <div className="bg-gray-200 h-4 rounded"></div>
        <div className="bg-gray-200 h-4 rounded w-5/6"></div>
      </div>
    </div>
  );
};

// Loading overlay component
interface LoadingOverlayProps {
  show: boolean;
  text?: string;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  show,
  text = "Loading...",
  className = "",
}) => {
  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}
    >
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <Loading size="lg" variant="spinner" text={text} />
      </div>
    </div>
  );
};

export default Loading;
