import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, AlertTriangle, TrendingDown, Zap } from "lucide-react";
import { toast } from "sonner";

interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  impact: string;
}

const scenarios: Scenario[] = [
  {
    id: "stockyard-low",
    name: "Stockyard Low Supply",
    description: "Simulate critical shortage in primary stockyard",
    icon: <AlertTriangle className="w-5 h-5" />,
    impact: "High",
  },
  {
    id: "wagon-shortage",
    name: "Wagon Shortage",
    description: "Reduced wagon availability scenario",
    icon: <TrendingDown className="w-5 h-5" />,
    impact: "Medium",
  },
  {
    id: "urgent-order",
    name: "Urgent Customer Order",
    description: "High-priority order requiring immediate dispatch",
    icon: <Zap className="w-5 h-5" />,
    impact: "Critical",
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

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          What-If Simulation
        </h1>
        <p className="text-muted-foreground">
          Test different scenarios and see AI-powered adjustments in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Selection */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold mb-4">Select Scenario</h3>
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
                  className={`p-2 rounded-lg ${
                    scenario.impact === "Critical"
                      ? "bg-red-500/20 text-red-400"
                      : scenario.impact === "High"
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {scenario.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{scenario.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {scenario.description}
                  </p>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      scenario.impact === "Critical"
                        ? "bg-red-500/20 text-red-400"
                        : scenario.impact === "High"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {scenario.impact} Impact
                  </span>
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

              {/* AI Recommendations */}
              <div className="glass-card p-6 rounded-xl glow-border-orange">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-secondary" />
                  AI Recommendations
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
                        <span className="text-primary">•</span>
                        <span>
                          Allocate dedicated rake for urgent order within 2
                          hours
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-primary">•</span>
                        <span>
                          Expedite loading process with priority lane assignment
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-primary">•</span>
                        <span>
                          Coordinate with railway dispatch for express clearance
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Simulation;
