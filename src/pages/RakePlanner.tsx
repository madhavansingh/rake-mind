import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RotateCcw, Download, Info, TrendingUp, AlertCircle, CheckCircle, Clock, Package, Train, Boxes } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Wagon {
  id: string;
  type: string;
  capacity: number;
  filled: number;
  order?: string;
  material?: string;
  destination?: string;
  priority?: "high" | "medium" | "low";
  status?: "loading" | "loaded" | "empty" | "maintenance";
}

const RakePlanner = () => {
  const [wagons, setWagons] = useState<Wagon[]>(
    Array.from({ length: 12 }, (_, i) => ({
      id: `W-${8800 + i}`,
      type: i % 3 === 0 ? "BCN" : i % 3 === 1 ? "BOXN" : "BRN",
      capacity: 65,
      filled: 0,
      status: "empty" as const,
    }))
  );

  const wagonTypeInfo = {
    BCN: { name: "Box Covered", desc: "For weather-sensitive materials", icon: Package },
    BOXN: { name: "Box Open", desc: "For general cargo & steel", icon: Boxes },
    BRN: { name: "Bogie Rail", desc: "For rails & long materials", icon: Train },
  };

  const materials = ["Steel Coils", "Steel Plates", "Steel Rods", "Iron Ore", "Coal"];
  const destinations = ["Mumbai Port", "Delhi NCR", "Kolkata Hub", "Chennai Zone", "Bangalore Depot"];

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedWagon, setSelectedWagon] = useState<string | null>(null);

  const handleAIOptimize = () => {
    setIsOptimizing(true);
    toast.info("🤖 AI analyzing orders, stockyard inventory, and wagon constraints...");

    setTimeout(() => {
      const priorities: Array<"high" | "medium" | "low"> = ["high", "high", "medium", "high", "low", "medium", "high", "medium", "low", "medium", "high", "medium"];
      const optimizedWagons = wagons.map((wagon, idx) => ({
        ...wagon,
        filled: 60 + Math.random() * 5,
        order: `ORD-${2400 + idx}`,
        material: materials[idx % materials.length],
        destination: destinations[idx % destinations.length],
        priority: priorities[idx],
        status: "loaded" as const,
      }));
      setWagons(optimizedWagons);
      setIsOptimizing(false);
      toast.success("✨ AI optimized rake formation! 96.4% utilization | ₹14,300 saved | 2.3hrs faster");
    }, 2000);
  };

  const handleReset = () => {
    setWagons(
      wagons.map((w) => ({
        ...w,
        filled: 0,
        order: undefined,
        material: undefined,
        destination: undefined,
        priority: undefined,
        status: "empty" as const,
      }))
    );
    setSelectedWagon(null);
    toast.info("Rake reset to empty state");
  };

  const avgUtilization = (
    (wagons.reduce((sum, w) => sum + w.filled, 0) / (wagons.length * 65)) *
    100
  ).toFixed(1);

  const selectedWagonData = wagons.find(w => w.id === selectedWagon);

  return (
    <TooltipProvider>
      <div className="p-8 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Rake Formation Planner
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              Interactive AI-powered wagon allocation system
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-primary cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>AI analyzes orders, stockyard inventory, and wagon availability to create optimal rake formations automatically</p>
                </TooltipContent>
              </Tooltip>
            </p>
          </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleReset}
            variant="outline"
            className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/10"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <Button
            onClick={handleAIOptimize}
            disabled={isOptimizing}
            className="gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 glow-cyan"
          >
            <Sparkles className="w-4 h-4" />
            {isOptimizing ? "Optimizing..." : "AI Suggest Plan"}
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="glass-card p-4 rounded-xl hover:glow-border-cyan transition-all">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-muted-foreground">Total Wagons</p>
            <Train className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-primary">{wagons.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Available in rake</p>
        </div>
        <div className="glass-card p-4 rounded-xl hover:glow-border-cyan transition-all">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-muted-foreground">Wagons Allocated</p>
            <CheckCircle className="w-4 h-4 text-secondary" />
          </div>
          <p className="text-2xl font-bold text-secondary">
            {wagons.filter((w) => w.filled > 0).length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {((wagons.filter((w) => w.filled > 0).length / wagons.length) * 100).toFixed(0)}% assigned
          </p>
        </div>
        <div className="glass-card p-4 rounded-xl hover:glow-border-cyan transition-all">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-muted-foreground">Avg Utilization</p>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-primary">{avgUtilization}%</p>
          <p className="text-xs text-muted-foreground mt-1">
            {Number(avgUtilization) > 95 ? "Excellent!" : Number(avgUtilization) > 85 ? "Good" : "Can improve"}
          </p>
        </div>
        <div className="glass-card p-4 rounded-xl hover:glow-border-cyan transition-all">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-muted-foreground">Total Capacity</p>
            <Package className="w-4 h-4 text-foreground" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            {wagons.length * 65}T
          </p>
          <p className="text-xs text-muted-foreground mt-1">Maximum load capacity</p>
        </div>
        <div className="glass-card p-4 rounded-xl hover:glow-border-cyan transition-all">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-muted-foreground">Est. Time</p>
            <Clock className="w-4 h-4 text-secondary" />
          </div>
          <p className="text-2xl font-bold text-secondary">
            {wagons.some(w => w.filled > 0) ? "6.5h" : "—"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Loading + dispatch</p>
        </div>
      </div>

      {/* Legend */}
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-primary" />
          <h4 className="font-semibold">Wagon Types Guide</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(wagonTypeInfo).map(([code, info]) => (
            <div key={code} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
              <div className="p-2 rounded bg-primary/20">
                <info.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">{code} - {info.name}</p>
                <p className="text-xs text-muted-foreground">{info.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Train Visualization */}
      <div className="glass-card p-8 rounded-xl glow-border-cyan">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <h3 className="text-xl font-semibold">Rake R-2401 Formation</h3>
            <Badge variant="outline" className="ml-2 border-primary/50 text-primary">
              Live Status
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded" />
              <span className="text-muted-foreground">High Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded" />
              <span className="text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded" />
              <span className="text-muted-foreground">Low</span>
            </div>
          </div>
        </div>

        {/* Locomotive */}
        <div className="flex items-start gap-3 mb-8">
          <div className="glass-card p-4 rounded-lg bg-secondary/20 border-secondary/50 min-w-[120px]">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Locomotive</p>
              <p className="text-sm font-bold text-secondary">WAG-9</p>
            </div>
          </div>
          <div className="flex-1 border-t-2 border-dashed border-primary/30 mt-6" />
        </div>

        {/* Wagons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wagons.map((wagon) => {
            const fillPercent = (wagon.filled / wagon.capacity) * 100;
            const isSelected = selectedWagon === wagon.id;
            const WagonIcon = wagonTypeInfo[wagon.type as keyof typeof wagonTypeInfo]?.icon || Package;

            return (
              <Tooltip key={wagon.id}>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => setSelectedWagon(isSelected ? null : wagon.id)}
                    className={`glass-card p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isSelected
                        ? "glow-border-orange ring-2 ring-secondary"
                        : "hover:glow-border-cyan"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <WagonIcon className="w-3 h-3 text-primary" />
                          <span className="text-xs font-bold text-primary">
                            {wagon.id}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-[10px] px-1 py-0">
                          {wagon.type}
                        </Badge>
                      </div>

                      {/* Fill visualization */}
                      <div className="relative h-20 bg-muted/30 rounded-lg overflow-hidden border border-muted/40">
                        {wagon.priority && (
                          <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                            wagon.priority === "high" ? "bg-red-500" :
                            wagon.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                          } animate-pulse`} />
                        )}
                        <div
                          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t transition-all duration-1000 ${
                            fillPercent > 90
                              ? "from-primary to-primary/70 animate-pulse-glow"
                              : fillPercent > 70
                              ? "from-secondary to-secondary/70"
                              : fillPercent > 0
                              ? "from-muted-foreground to-muted-foreground/70"
                              : ""
                          }`}
                          style={{ height: `${fillPercent}%` }}
                        >
                          {fillPercent > 0 && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-bold text-background drop-shadow">
                                {wagon.filled.toFixed(1)}T
                              </span>
                            </div>
                          )}
                        </div>
                        {fillPercent === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">Empty</span>
                          </div>
                        )}
                      </div>

                      <div className="text-center space-y-1">
                        {wagon.order ? (
                          <>
                            <p className="text-xs text-secondary font-medium">
                              {wagon.order}
                            </p>
                            {wagon.material && (
                              <p className="text-[10px] text-muted-foreground truncate">
                                {wagon.material}
                              </p>
                            )}
                          </>
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            Not assigned
                          </p>
                        )}
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                          <span>{fillPercent.toFixed(0)}%</span>
                          {wagon.status && wagon.status !== "empty" && (
                            <Badge variant="secondary" className="text-[9px] px-1 py-0">
                              {wagon.status}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-semibold">{wagon.id} - {wagon.type}</p>
                    <p className="text-xs">Capacity: {wagon.capacity}T</p>
                    {wagon.material && <p className="text-xs">Material: {wagon.material}</p>}
                    {wagon.destination && <p className="text-xs">Destination: {wagon.destination}</p>}
                    <p className="text-xs">Click for details</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* Selected Wagon Details */}
      {selectedWagonData && (
        <div className="glass-card p-6 rounded-xl glow-border-orange animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Package className="w-5 h-5 text-secondary" />
              Wagon Details: {selectedWagonData.id}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedWagon(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              Close
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Wagon Type</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">{selectedWagonData.type}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {wagonTypeInfo[selectedWagonData.type as keyof typeof wagonTypeInfo]?.name}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Capacity</p>
                <p className="text-2xl font-bold">{selectedWagonData.capacity}T</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Load</p>
                <p className="text-2xl font-bold text-primary">
                  {selectedWagonData.filled > 0 ? `${selectedWagonData.filled.toFixed(1)}T` : "Empty"}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {selectedWagonData.order && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                    <p className="text-lg font-semibold text-secondary">{selectedWagonData.order}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Material</p>
                    <p className="text-lg font-semibold">{selectedWagonData.material || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Priority</p>
                    <Badge className={
                      selectedWagonData.priority === "high" ? "bg-red-500" :
                      selectedWagonData.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                    }>
                      {selectedWagonData.priority?.toUpperCase() || "—"}
                    </Badge>
                  </div>
                </>
              )}
            </div>
            <div className="space-y-4">
              {selectedWagonData.destination && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Destination</p>
                  <p className="text-lg font-semibold">{selectedWagonData.destination}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge variant="outline" className="capitalize">
                  {selectedWagonData.status || "empty"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Utilization</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-primary">
                    {((selectedWagonData.filled / selectedWagonData.capacity) * 100).toFixed(1)}%
                  </p>
                  {((selectedWagonData.filled / selectedWagonData.capacity) * 100) > 95 && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {((selectedWagonData.filled / selectedWagonData.capacity) * 100) < 70 && selectedWagonData.filled > 0 && (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Section */}
      {wagons.some((w) => w.filled > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-xl">
            <h4 className="text-lg font-semibold mb-4 text-muted-foreground">
              Manual Planning
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg Utilization</span>
                <span className="text-xl font-bold text-muted-foreground">
                  72.3%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Time Required</span>
                <span className="text-xl font-bold text-muted-foreground">
                  ~45 min
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Estimated Cost</span>
                <span className="text-xl font-bold text-muted-foreground">
                  ₹82,500
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl glow-border-cyan">
            <h4 className="text-lg font-semibold mb-4 text-primary">
              AI Planning
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg Utilization</span>
                <span className="text-xl font-bold text-primary">
                  {avgUtilization}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Time Required</span>
                <span className="text-xl font-bold text-primary">~2 sec</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Estimated Cost</span>
                <span className="text-xl font-bold text-primary">₹68,200</span>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </TooltipProvider>
  );
};

export default RakePlanner;
