import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ style, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        borderRadius: "0.5rem",
        border: "1px solid #ddd",
        backgroundColor: "#f9f9f9",
        color: "#333",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        ...style,
      }}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ style, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.375rem",
        padding: "1.5rem",
        ...style,
      }}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ style, ...props }, ref) => (
  <h3
    ref={ref}
    style={{
      fontSize: "1.5rem",
      fontWeight: "600",
      lineHeight: "1.2",
      letterSpacing: "-0.01em",
      ...style,
    }}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ style, ...props }, ref) => (
  <p
    ref={ref}
    style={{
      fontSize: "0.875rem",
      color: "#6b7280", // Muted color for description
      ...style,
    }}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ style, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        padding: "1.5rem",
        paddingTop: "0",
        ...style,
      }}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardProps>(
  ({ style, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "1.5rem",
        paddingTop: "0",
        ...style,
      }}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
