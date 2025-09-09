import * as React from "react"
import { cn } from "@/lib/utils"

const Dialog = ({ children, open, onOpenChange }: any) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
      />
      <div className="relative bg-white rounded-lg max-w-lg w-full mx-4">
        {children}
      </div>
    </div>
  );
};

const DialogTrigger = ({ children, asChild }: any) => {
  return children;
};

const DialogContent = ({ children, className }: any) => {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  );
};

const DialogHeader = ({ children }: any) => {
  return <div className="mb-4">{children}</div>;
};

const DialogTitle = ({ children }: any) => {
  return <h2 className="text-lg font-semibold">{children}</h2>;
};

const DialogDescription = ({ children }: any) => {
  return <p className="text-sm text-gray-600">{children}</p>;
};

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
}
