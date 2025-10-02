import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw, Download } from "lucide-react";
import { toast } from "sonner";

interface Wagon {
  id: string;
  type: string;
  capacity: number;
  filled: number;
  order?: string;
}

const RakePlanner = () => {
  const [wagons, setWagons] = useState<Wagon[]>(
    Array.from({ length: 12 }, (_, i) => ({
      id: `W-${8800 + i}`,
      type: i % 3 === 0 ? "BCN" : i % 3 === 1 ? "BOXN" : "BRN",
      capacity: 65,
      filled: 0,
    }))
  );

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedWagon, setSelectedWagon] = useState<string | null>(null);

  const handleAIOptimize = () => {
    setIsOptimizing(true);
    toast.info("AI optimization in progress...");

    setTimeout(() => {
      const optimizedWagons = wagons.map((wagon, idx) => ({
        ...wagon,
        filled: 60 + Math.random() * 5,
        order: `ORD-${2400 + idx}`,
      }));
      setWagons(optimizedWagons);
      setIsOptimizing(false);
      toast.success("Rake optimized successfully! 96.4% utilization achieved.");
    }, 2000);
  };

  const handleReset = () => {
    setWagons(
      wagons.map((w) => ({
        ...w,
        filled: 0,
        order: undefined,
      }))
    );
    toast.info("Rake reset to empty state");
  };

  const avgUtilization = (
    (wagons.reduce((sum, w) => sum + w.filled, 0) / (wagons.length * 65)) *
    100
  ).toFixed(1);

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Rake Formation Planner
          </h1>
          <p className="text-muted-foreground">
            Interactive AI-powered wagon allocation system
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">Total Wagons</p>
          <p className="text-2xl font-bold text-primary">{wagons.length}</p>
        </div>
        <div className="glass-card p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">
            Wagons Allocated
          </p>
          <p className="text-2xl font-bold text-secondary">
            {wagons.filter((w) => w.filled > 0).length}
          </p>
        </div>
        <div className="glass-card p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">Avg Utilization</p>
          <p className="text-2xl font-bold text-primary">{avgUtilization}%</p>
        </div>
        <div className="glass-card p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">Total Capacity</p>
          <p className="text-2xl font-bold text-foreground">
            {wagons.length * 65}T
          </p>
        </div>
      </div>

      {/* Train Visualization */}
      <div className="glass-card p-8 rounded-xl glow-border-cyan">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
          <h3 className="text-xl font-semibold">Rake R-2401 Formation</h3>
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

            return (
              <div
                key={wagon.id}
                onClick={() => setSelectedWagon(wagon.id)}
                className={`glass-card p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected
                    ? "glow-border-orange ring-2 ring-secondary"
                    : "hover:glow-border-cyan"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary">
                      {wagon.id}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {wagon.type}
                    </span>
                  </div>

                  {/* Fill visualization */}
                  <div className="relative h-20 bg-muted/30 rounded-lg overflow-hidden">
                    <div
                      className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t transition-all duration-1000 ${
                        fillPercent > 90
                          ? "from-primary to-primary/70"
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
                          <span className="text-xs font-bold text-background">
                            {wagon.filled.toFixed(1)}T
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    {wagon.order ? (
                      <p className="text-xs text-secondary font-medium">
                        {wagon.order}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Not assigned
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {fillPercent.toFixed(0)}% filled
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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
  );
};

export default RakePlanner;
