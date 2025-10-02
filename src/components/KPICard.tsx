import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  color?: "cyan" | "orange";
  className?: string;
}

const KPICard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "cyan",
  className,
}: KPICardProps) => {
  return (
    <div
      className={cn(
        "glass-card p-6 rounded-xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer",
        color === "cyan" ? "hover:glow-border-cyan" : "hover:glow-border-orange",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "p-3 rounded-lg",
            color === "cyan" ? "bg-primary/20" : "bg-secondary/20"
          )}
        >
          <Icon
            className={cn(
              "w-6 h-6",
              color === "cyan" ? "text-primary" : "text-secondary"
            )}
          />
        </div>
        {trend && (
          <div
            className={cn(
              "text-sm font-medium px-2 py-1 rounded",
              trend.positive
                ? "text-green-400 bg-green-400/10"
                : "text-red-400 bg-red-400/10"
            )}
          >
            {trend.positive ? "+" : ""}
            {trend.value}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default KPICard;
