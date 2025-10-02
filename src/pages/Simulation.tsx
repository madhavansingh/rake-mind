import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, AlertTriangle, TrendingDown, Zap, Info, Clock, TrendingUp, Package, DollarSign, Activity, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  impact: string;
  category: string;
  estimatedTime: string;
  affectedRakes: number;
}

const scenarios: Scenario[] = [
  {
    id: "stockyard-low",
    name: "Stockyard Low Supply",
    description: "Simulate critical shortage in primary stockyard with only 40% inventory remaining",
    icon: <AlertTriangle className="w-5 h-5" />,
    impact: "High",
    category: "Inventory",
    estimatedTime: "9.8 hrs",
    affectedRakes: 3,
  },
  {
    id: "wagon-shortage",
    name: "Wagon Shortage",
    description: "Reduced wagon availability - only 8 out of 12 wagons operational due to maintenance",
    icon: <TrendingDown className="w-5 h-5" />,
    impact: "Medium",
    category: "Resources",
    estimatedTime: "8.9 hrs",
    affectedRakes: 2,
  },
  {
    id: "urgent-order",
    name: "Urgent Customer Order",
    description: "High-priority order requiring immediate dispatch within 6 hours for premium client",
    icon: <Zap className="w-5 h-5" />,
    impact: "Critical",
    category: "Operations",
    estimatedTime: "6.2 hrs",
    affectedRakes: 1,
  },
  {
    id: "weather-delay",
    name: "Weather Disruption",
    description: "Heavy rainfall causing loading delays and reduced operational hours",
    icon: <Activity className="w-5 h-5" />,
    impact: "High",
    category: "External",
    estimatedTime: "11.5 hrs",
    affectedRakes: 4,
  },
  {
    id: "peak-demand",
    name: "Peak Demand Surge",
    description: "25% increase in order volume during festival season requiring optimal allocation",
    icon: <TrendingUp className="w-5 h-5" />,
    impact: "High",
    category: "Demand",
    estimatedTime: "7.8 hrs",
    affectedRakes: 5,
  },
];

const Simulation = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleRunSimulation = () => {
    if (!selectedScenario) {
      toast.error("Please select a scenario first");
      return;
    }

    setIsSimulating(true);
    toast.info("Running AI simulation...");

    setTimeout(() => {
      const mockResults = {
        originalPlan: {
          rakes: 18,
          utilization: 96.4,
          cost: 245000,
          time: 8.5,
        },
        adjustedPlan: {
          rakes: selectedScenario === "wagon-shortage" ? 20 : 19,
          utilization:
            selectedScenario === "stockyard-low"
              ? 88.2
              : selectedScenario === "wagon-shortage"
              ? 91.7
              : 94.8,
          cost:
            selectedScenario === "urgent-order"
              ? 268000
              : selectedScenario === "wagon-shortage"
              ? 272000
              : 258000,
          time:
            selectedScenario === "urgent-order"
              ? 6.2
              : selectedScenario === "stockyard-low"
              ? 9.8
              : 8.9,
        },
      };
      setResults(mockResults);
      setIsSimulating(false);
      toast.success("Simulation completed successfully!");
    }, 3000);
  };

  const selectedScenarioData = scenarios.find(s => s.id === selectedScenario);

  return (
    <TooltipProvider>
      <div className="p-8 space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              What-If Simulation
            </h1>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-5 h-5 text-primary cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>AI-powered simulation engine tests various operational scenarios and provides optimized solutions with predicted outcomes</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-muted-foreground">
            Test different scenarios and see AI-powered adjustments in real-time
          </p>
          <div className="flex items-center gap-4 mt-3">
            <Badge variant="outline" className="gap-1">
              <Activity className="w-3 h-3" />
              {scenarios.length} Scenarios Available
            </Badge>
            <Badge variant="outline" className="gap-1 border-primary/50 text-primary">
              <Zap className="w-3 h-3" />
              AI-Powered Analysis
            </Badge>
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Selection */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Select Scenario</h3>
            <Badge variant="secondary" className="text-xs">
              {scenarios.length} Total
            </Badge>
          </div>
          {scenarios.map((scenario) => (
            <Card
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.id)}
              className={`p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                selectedScenario === scenario.id
                  ? "glass-card glow-border-cyan ring-2 ring-primary"
                  : "glass-card hover:glow-border-cyan"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg flex-shrink-0 ${
                    scenario.impact === "Critical"
                      ? "bg-red-500/20 text-red-400"
                      : scenario.impact === "High"
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {scenario.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{scenario.name}</h4>
                    <Badge variant="outline" className="text-[10px] px-1 py-0 flex-shrink-0">
                      {scenario.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {scenario.description}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      className={`text-xs font-medium px-2 py-0 ${
                        scenario.impact === "Critical"
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : scenario.impact === "High"
                          ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }`}
                      variant="outline"
                    >
                      {scenario.impact} Impact
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {scenario.estimatedTime}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Package className="w-3 h-3" />
                      {scenario.affectedRakes} Rakes
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          <Button
            onClick={handleRunSimulation}
            disabled={!selectedScenario || isSimulating}
            className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 glow-cyan"
          >
            <Play className="w-4 h-4" />
            {isSimulating ? "Simulating..." : "Run Simulation"}
          </Button>
        </div>

        {/* Results Display */}
        <div className="lg:col-span-2 space-y-4">
          {!results && !isSimulating && (
            <div className="glass-card p-12 rounded-xl text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Play className="w-10 h-10 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Select a scenario and run simulation to see AI-powered
                adjustments
              </p>
            </div>
          )}

          {isSimulating && (
            <div className="glass-card p-12 rounded-xl text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                AI Simulation in Progress
              </h3>
              <p className="text-muted-foreground">
                Analyzing constraints and optimizing rake formation...
              </p>
            </div>
          )}

          {results && !isSimulating && (
            <div className="space-y-6 animate-slide-up">
              <h3 className="text-2xl font-bold">Simulation Results</h3>

              {/* Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original Plan */}
                <div className="glass-card p-6 rounded-xl">
                  <h4 className="text-lg font-semibold mb-4 text-muted-foreground">
                    Original Plan
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Rakes Required
                      </p>
                      <p className="text-3xl font-bold">
                        {results.originalPlan.rakes}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Utilization
                      </p>
                      <p className="text-3xl font-bold">
                        {results.originalPlan.utilization}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Estimated Cost
                      </p>
                      <p className="text-3xl font-bold">
                        ₹{(results.originalPlan.cost / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Completion Time
                      </p>
                      <p className="text-3xl font-bold">
                        {results.originalPlan.time}h
                      </p>
                    </div>
                  </div>
                </div>

                {/* Adjusted Plan */}
                <div className="glass-card p-6 rounded-xl glow-border-cyan">
                  <h4 className="text-lg font-semibold mb-4 text-primary">
                    AI-Adjusted Plan
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Rakes Required
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-primary">
                          {results.adjustedPlan.rakes}
                        </p>
                        <span
                          className={`text-sm ${
                            results.adjustedPlan.rakes >
                            results.originalPlan.rakes
                              ? "text-red-400"
                              : "text-green-400"
                          }`}
                        >
                          {results.adjustedPlan.rakes >
                          results.originalPlan.rakes
                            ? `+${
                                results.adjustedPlan.rakes -
                                results.originalPlan.rakes
                              }`
                            : results.adjustedPlan.rakes <
                              results.originalPlan.rakes
                            ? `-${
                                results.originalPlan.rakes -
                                results.adjustedPlan.rakes
                              }`
                            : "—"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Utilization
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-primary">
                          {results.adjustedPlan.utilization}%
                        </p>
                        <span
                          className={`text-sm ${
                            results.adjustedPlan.utilization <
                            results.originalPlan.utilization
                              ? "text-red-400"
                              : "text-green-400"
                          }`}
                        >
                          {(
                            results.adjustedPlan.utilization -
                            results.originalPlan.utilization
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Estimated Cost
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-primary">
                          ₹{(results.adjustedPlan.cost / 1000).toFixed(0)}K
                        </p>
                        <span
                          className={`text-sm ${
                            results.adjustedPlan.cost >
                            results.originalPlan.cost
                              ? "text-red-400"
                              : "text-green-400"
                          }`}
                        >
                          {results.adjustedPlan.cost > results.originalPlan.cost
                            ? `+₹${(
                                (results.adjustedPlan.cost -
                                  results.originalPlan.cost) /
                                1000
                              ).toFixed(0)}K`
                            : `−₹${(
                                (results.originalPlan.cost -
                                  results.adjustedPlan.cost) /
                                1000
                              ).toFixed(0)}K`}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Completion Time
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-primary">
                          {results.adjustedPlan.time}h
                        </p>
                        <span
                          className={`text-sm ${
                            results.adjustedPlan.time >
                            results.originalPlan.time
                              ? "text-red-400"
                              : "text-green-400"
                          }`}
                        >
                          {results.adjustedPlan.time > results.originalPlan.time
                            ? `+${(
                                results.adjustedPlan.time -
                                results.originalPlan.time
                              ).toFixed(1)}h`
                            : `−${(
                                results.originalPlan.time -
                                results.adjustedPlan.time
                              ).toFixed(1)}h`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Insights & Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="glass-card p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <p className="text-xs text-muted-foreground">Cost Impact</p>
                  </div>
                  <p className="text-xl font-bold">
                    {results.adjustedPlan.cost > results.originalPlan.cost ? "+" : "−"}₹
                    {Math.abs((results.adjustedPlan.cost - results.originalPlan.cost) / 1000).toFixed(0)}K
                  </p>
                </div>
                <div className="glass-card p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-secondary" />
                    <p className="text-xs text-muted-foreground">Time Saved</p>
                  </div>
                  <p className="text-xl font-bold text-primary">
                    {results.originalPlan.time > results.adjustedPlan.time ? "−" : "+"}
                    {Math.abs(results.originalPlan.time - results.adjustedPlan.time).toFixed(1)}h
                  </p>
                </div>
                <div className="glass-card p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <p className="text-xs text-muted-foreground">Efficiency</p>
                  </div>
                  <p className="text-xl font-bold">
                    {results.adjustedPlan.utilization.toFixed(1)}%
                  </p>
                </div>
                <div className="glass-card p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-foreground" />
                    <p className="text-xs text-muted-foreground">Rake Diff</p>
                  </div>
                  <p className="text-xl font-bold">
                    {results.adjustedPlan.rakes === results.originalPlan.rakes ? "=" : 
                     results.adjustedPlan.rakes > results.originalPlan.rakes ? "+" : "−"}
                    {Math.abs(results.adjustedPlan.rakes - results.originalPlan.rakes)}
                  </p>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="glass-card p-6 rounded-xl glow-border-orange">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-secondary" />
                  AI Recommendations
                  <Badge variant="outline" className="ml-auto text-xs">
                    Auto-generated
                  </Badge>
                </h4>
                <ul className="space-y-2">
                  {selectedScenario === "stockyard-low" && (
                    <>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-primary">•</span>
                        <span>
                          Redirect 3 rakes to alternate stockyard with higher
                          inventory
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-primary">•</span>
                        <span>
                          Adjust wagon types to match available material grades
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-primary">•</span>
                        <span>
                          Schedule emergency stockyard replenishment within 4
                          hours
                        </span>
                      </li>
                    </>
                  )}
                  {selectedScenario === "wagon-shortage" && (
                    <>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-primary">•</span>
                        <span>Increase utilization per wagon by 5-8%</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-primary">•</span>
                        <span>
                          Prioritize high-value orders in limited wagon pool
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-primary">•</span>
                        <span>
                          Coordinate with maintenance to expedite wagon
                          availability
                        </span>
                      </li>
                    </>
                  )}
                  {selectedScenario === "urgent-order" && (
                    <>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Allocate dedicated rake for urgent order within 2
                          hours
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Expedite loading process with priority lane assignment
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Coordinate with railway dispatch for express clearance
                        </span>
                      </li>
                    </>
                  )}
                  {selectedScenario === "weather-delay" && (
                    <>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Shift operations to covered loading bays
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Extend working hours post-weather clearance
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Prioritize weather-resistant wagon types (BCN)
                        </span>
                      </li>
                    </>
                  )}
                  {selectedScenario === "peak-demand" && (
                    <>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Increase rake frequency by 25% during peak hours
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Activate backup stockyard to meet demand surge
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Optimize wagon mix for maximum throughput
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Risk Assessment */}
              <div className="glass-card p-6 rounded-xl">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Risk Assessment
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <span className="text-sm">Delivery Delay Risk</span>
                    <Badge className={
                      selectedScenarioData?.impact === "Critical" ? "bg-red-500" :
                      selectedScenarioData?.impact === "High" ? "bg-orange-500" : "bg-yellow-500"
                    }>
                      {selectedScenarioData?.impact}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <span className="text-sm">Resource Utilization</span>
                    <Badge className="bg-primary">
                      {results.adjustedPlan.utilization > 90 ? "Optimal" : "Moderate"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <span className="text-sm">Cost Overrun</span>
                    <Badge className={results.adjustedPlan.cost > results.originalPlan.cost ? "bg-orange-500" : "bg-green-500"}>
                      {results.adjustedPlan.cost > results.originalPlan.cost ? "Elevated" : "Controlled"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </TooltipProvider>
  );
};

export default Simulation;
