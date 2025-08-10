import React from 'react';

interface ErrorProps {
  message?: string;
  title?: string;
  variant?: 'alert' | 'banner' | 'inline' | 'card';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  showIcon?: boolean;
}

const Error: React.FC<ErrorProps> = ({
  message = 'Something went wrong. Please try again.',
  title = 'Error',
  variant = 'alert',
  size = 'md',
  className = '',
  onRetry,
  onDismiss,
  showIcon = true,
}) => {
  const sizeClasses = {
    sm: 'text-sm p-3',
    md: 'text-base p-4',
    lg: 'text-lg p-6',
  };

  const variantClasses = {
    alert: 'bg-red-50 border border-red-200 text-red-700 rounded-lg',
    banner: 'bg-red-600 text-white',
    inline: 'text-red-600 bg-transparent',
    card: 'bg-white border border-red-200 rounded-xl shadow-xs',
  };

  const ErrorIcon = () => (
    <svg
      className="h-5 w-5 text-red-500 shrink-0"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
        clipRule="evenodd"
      />
    </svg>
  );

  const CloseIcon = () => (
    <svg
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
  );

  return (
    <div
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      role="alert"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {showIcon && variant !== 'inline' && <ErrorIcon />}

          <div className="flex-1">
            {variant !== 'inline' && (
              <h3 className="font-semibold mb-1">{title}</h3>
            )}
            <p className={variant === 'inline' ? 'font-medium' : ''}>{message}</p>

            {onRetry && (
              <button
                onClick={onRetry}
                className={`mt-3 inline-flex items-center px-3 py-1.5 text-sm font-medium rounded transition-colors duration-200 ${
                  variant === 'banner'
                    ? 'bg-red-700 hover:bg-red-800 text-white'
                    : 'bg-red-100 hover:bg-red-200 text-red-700'
                }`}
              >
                Try Again
              </button>
            )}
          </div>
        </div>

        {onDismiss && variant !== 'inline' && (
          <button
            onClick={onDismiss}
            className={`ml-3 shrink-0 p-1 rounded transition-colors duration-200 ${
              variant === 'banner'
                ? 'hover:bg-red-700 text-red-200 hover:text-white'
                : 'hover:bg-red-100 text-red-400 hover:text-red-600'
            }`}
            aria-label="Dismiss error"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
};

// Specific error components
interface NotFoundErrorProps {
  resource?: string;
  className?: string;
  onGoBack?: () => void;
}

export const NotFoundError: React.FC<NotFoundErrorProps> = ({
  resource = 'page',
  className = '',
  onGoBack,
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
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
            d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {resource} Not Found
      </h3>
      <p className="text-gray-600 mb-6">
        The {resource} you're looking for doesn't exist or has been moved.
      </p>
      {onGoBack && (
        <button onClick={onGoBack} className="btn-primary">
          Go Back
        </button>
      )}
    </div>
  );
};

interface NetworkErrorProps {
  onRetry?: () => void;
  className?: string;
}

export const NetworkError: React.FC<NetworkErrorProps> = ({
  onRetry,
  className = '',
}) => {
  return (
    <Error
      title="Connection Error"
      message="Unable to connect to the server. Please check your internet connection and try again."
      variant="card"
      onRetry={onRetry}
      className={`max-w-md mx-auto ${className}`}
    />
  );
};

interface FirestoreErrorProps {
  error: Error;
  onRetry?: () => void;
  className?: string;
}

export const FirestoreError: React.FC<FirestoreErrorProps> = ({
  error,
  onRetry,
  className = '',
}) => {
  const getErrorMessage = (error: Error): string => {
    const message = error.message.toLowerCase();

    if (message.includes('permission-denied')) {
      return 'You don\'t have permission to access this data.';
    }
    if (message.includes('not-found')) {
      return 'The requested data could not be found.';
    }
    if (message.includes('unavailable')) {
      return 'The service is temporarily unavailable. Please try again later.';
    }
    if (message.includes('unauthenticated')) {
      return 'Please sign in to access this data.';
    }

    return error.message;
  };

  return (
    <Error
      title="Data Error"
      message={getErrorMessage(error)}
      variant="alert"
      onRetry={onRetry}
      className={className}
    />
  );
};

export default Error;
