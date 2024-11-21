import * as React from "react";

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ children, className = "", style = {}, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          overflowY: "auto",
          maxHeight: "100%", // Customize as needed
          paddingRight: "4px", // Space for scrollbar clearance
          position: "relative",
          ...style,
          //...scrollbarStyles, // Custom scrollbar styling
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = "ScrollArea";

export { ScrollArea };

// Custom scrollbar styles
/*
const scrollbarStyles: React.CSSProperties = {
  scrollbarWidth: "thin", // For Firefox
  scrollbarColor: "#c1c1c1 #f1f1f1", // Thumb color, track color (for Firefox)

  // For Webkit-based browsers (Chrome, Safari)
  msOverflowStyle: "none",
  "::-webkit-scrollbar": {
    width: "8px",
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#c1c1c1",
    borderRadius: "4px",
  },
  "::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#a1a1a1",
  },
};
*/