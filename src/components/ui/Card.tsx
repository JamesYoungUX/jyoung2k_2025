import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outlined" | "elevated" | "ghost";
  padding?: "none" | "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  padding = "md",
  rounded = "xl",
  hover = false,
  clickable = false,
  onClick,
}) => {
  const variantClasses = {
    default: "bg-white border border-gray-200 shadow-xs",
    outlined: "bg-white border-2 border-gray-300",
    elevated: "bg-white shadow-lg border border-gray-100",
    ghost: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const roundedClasses = {
    none: "",
    sm: "rounded-xs",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
  };

  const baseClasses = `${variantClasses[variant]} ${paddingClasses[padding]} ${roundedClasses[rounded]}`;

  const interactiveClasses =
    clickable || onClick ? "cursor-pointer transition-all duration-200" : "";

  const hoverClasses =
    hover || clickable || onClick
      ? "hover:shadow-md hover:-translate-y-0.5"
      : "";

  const combinedClasses = `${baseClasses} ${interactiveClasses} ${hoverClasses} ${className}`;

  if (clickable || onClick) {
    return (
      <div
        className={combinedClasses}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && onClick) {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {children}
      </div>
    );
  }

  return <div className={combinedClasses}>{children}</div>;
};

// Card Header Component
interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  className = "",
  children,
}) => {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div className="flex-1">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        )}
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        {children}
      </div>
      {action && <div className="shrink-0 ml-4">{action}</div>}
    </div>
  );
};

// Card Body Component
interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = "",
}) => {
  return <div className={`text-gray-700 ${className}`}>{children}</div>;
};

// Card Footer Component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  separator?: boolean;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = "",
  separator = true,
}) => {
  return (
    <div
      className={`${separator ? "border-t border-gray-200 pt-4" : ""} mt-4 ${className}`}
    >
      {children}
    </div>
  );
};

// Content Card - Specialized for Firestore content
interface ContentCardProps {
  title: string;
  content?: string;
  meta?: {
    date?: string;
    author?: string;
    category?: string;
    tags?: string[];
  };
  image?: string;
  className?: string;
  onClick?: () => void;
  actions?: React.ReactNode;
  featured?: boolean;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  content,
  meta,
  image,
  className = "",
  onClick,
  actions,
  featured = false,
}) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  return (
    <Card
      className={`${featured ? "ring-2 ring-blue-200 bg-blue-50/50" : ""} ${className}`}
      clickable={!!onClick}
      onClick={onClick}
      hover
    >
      {image && (
        <div className="relative h-48 -m-4 mb-4 rounded-t-xl overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          {featured && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Featured
              </span>
            </div>
          )}
        </div>
      )}

      <CardHeader title={title} action={actions} />

      {content && (
        <CardBody>
          <p className="text-gray-600 leading-relaxed">
            {truncateText(content, 150)}
          </p>
        </CardBody>
      )}

      {meta && (
        <CardFooter separator={false}>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              {meta.author && (
                <span className="flex items-center">
                  <svg
                    className="h-4 w-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {meta.author}
                </span>
              )}
              {meta.date && (
                <span className="flex items-center">
                  <svg
                    className="h-4 w-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {meta.date}
                </span>
              )}
              {meta.category && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                  {meta.category}
                </span>
              )}
            </div>
          </div>

          {meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {meta.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-blue-100 text-blue-700"
                >
                  #{tag}
                </span>
              ))}
              {meta.tags.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{meta.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    trend: "up" | "down" | "neutral";
  };
  icon?: React.ReactNode;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  className = "",
}) => {
  const getTrendColor = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getTrendIcon = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "down":
        return (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`${className}`} variant="default">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <div
              className={`flex items-center mt-2 text-sm ${getTrendColor(change.trend)}`}
            >
              {getTrendIcon(change.trend)}
              <span className="ml-1">{change.value}</span>
            </div>
          )}
        </div>
        {icon && <div className="text-blue-600">{icon}</div>}
      </div>
    </Card>
  );
};

export default Card;
