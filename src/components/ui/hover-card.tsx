import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./card";

// HoverCard component that adds a pop-out effect on hover
const HoverCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow p-5 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1",
      className
    )}
    {...props}
  />
));
HoverCard.displayName = "HoverCard";

// HoverCardHeader component
const HoverCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardHeader ref={ref} className={className} {...props} />
));
HoverCardHeader.displayName = "HoverCardHeader";

// HoverCardContent component
const HoverCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardContent ref={ref} className={className} {...props} />
));
HoverCardContent.displayName = "HoverCardContent";

// HoverCardFooter component
const HoverCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardFooter ref={ref} className={className} {...props} />
));
HoverCardFooter.displayName = "HoverCardFooter";

export { HoverCard, HoverCardHeader, HoverCardContent, HoverCardFooter };