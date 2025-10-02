import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Train,
  FlaskConical,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Rake Planner", path: "/rake-planner", icon: Train },
  { name: "Simulation", path: "/simulation", icon: FlaskConical },
  { name: "Reports", path: "/reports", icon: FileText },
  { name: "Settings", path: "/settings", icon: Settings },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative h-screen bg-card/50 backdrop-blur-xl border-r border-primary/20 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo section */}
      <div className="h-16 flex items-center justify-center border-b border-primary/20 px-4">
        {!collapsed && (
          <div className="flex items-center gap-2 animate-fade-in">
            <Train className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              RakeMind
            </span>
          </div>
        )}
        {collapsed && <Train className="w-8 h-8 text-primary" />}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-primary/20 text-primary glow-border-cyan"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <span className="font-medium transition-opacity duration-200">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-card border border-primary/30 rounded-full flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-all duration-200 glow-cyan"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-primary" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-primary" />
        )}
      </button>

      {/* Footer */}
      <div className="p-4 border-t border-primary/20">
        {!collapsed && (
          <div className="text-xs text-muted-foreground text-center animate-fade-in">
            <p>SAIL RakeMind v2.1</p>
            <p className="text-[10px] mt-1">AI Decision Support</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
