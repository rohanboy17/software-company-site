import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlassCard({ children, className, glowColor = "rgba(34, 211, 238, 0.15)" }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10",
        "transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl",
        "group",
        className
      )}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${glowColor}, transparent 70%)`
        }}
      />
      <div className="relative z-10 p-6 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
