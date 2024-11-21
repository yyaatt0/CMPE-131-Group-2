import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button" | "a" | "div"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ as = "button", variant = "default", size = "default", className, ...props }, ref) => {
    const Component = as

    const baseClasses = "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variantClasses = {
      default: "bg-primary text-white hover:bg-primary/90",
      destructive: "bg-red-500 text-white hover:bg-red-600",
      outline: "border border-gray-300 bg-white hover:bg-gray-100",
      secondary: "bg-gray-300 text-black hover:bg-gray-400",
      ghost: "bg-transparent hover:bg-gray-100",
      link: "text-blue-600 underline hover:no-underline"
    }

    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "h-10 w-10"
    }

    const finalClassName = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    ].filter(Boolean).join(" ")

    return (
      <Component
        className={finalClassName}
        ref={React.useRef(null)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
