import { Button } from "@/components/ui/button";
import { Download, Calendar, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface DispatchEntry {
  rakeId: string;
  time: string;
  destination: string;
  wagons: number;
  utilization: number;
  status: "on-time" | "delayed" | "risk";
}

const dispatchData: DispatchEntry[] = [
  {
    rakeId: "R-2401",
    time: "08:15",
    destination: "Rourkela",
    wagons: 12,
    utilization: 96.4,
    status: "on-time",
  },
  {
    rakeId: "R-2402",
    time: "10:30",
    destination: "Bhilai",
    wagons: 14,
    utilization: 94.8,
    status: "on-time",
  },
  {
    rakeId: "R-2403",
    time: "12:45",
    destination: "Bokaro",
    wagons: 11,
    utilization: 91.2,
    status: "delayed",
  },
  {
    rakeId: "R-2404",
    time: "14:00",
    destination: "Durgapur",
    wagons: 13,
    utilization: 95.6,
    status: "on-time",
  },
  {
    rakeId: "R-2405",
    time: "15:30",
    destination: "Jamshedpur",
    wagons: 12,
    utilization: 88.3,
    status: "risk",
  },
  {
    rakeId: "R-2406",
    time: "17:00",
    destination: "Rourkela",
    wagons: 15,
    utilization: 97.1,
    status: "on-time",
  },
];

const Reports = () => {
  const handleExport = (format: "pdf" | "csv") => {
    toast.success(`Exporting report as ${format.toUpperCase()}...`);
    // Mock export functionality
    setTimeout(() => {
      toast.success(`Report exported successfully!`);
    }, 1500);
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Daily Dispatch Reports
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Today's Schedule • {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => handleExport("csv")}
            variant="outline"
            className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/10"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button
            onClick={() => handleExport("pdf")}
            className="gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 glow-cyan"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">
            Total Dispatches
          </p>
          <p className="text-3xl font-bold text-foreground">
            {dispatchData.length}
          </p>
        </div>
        <div className="glass-card p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">On Time</p>
          <p className="text-3xl font-bold text-green-400">
            {dispatchData.filter((d) => d.status === "on-time").length}
          </p>
        </div>
        <div className="glass-card p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">Delayed</p>
          <p className="text-3xl font-bold text-yellow-400">
            {dispatchData.filter((d) => d.status === "delayed").length}
          </p>
        </div>
        <div className="glass-card p-4 rounded-xl">
          <p className="text-sm text-muted-foreground mb-1">At Risk</p>
          <p className="text-3xl font-bold text-red-400">
            {dispatchData.filter((d) => d.status === "risk").length}
          </p>
        </div>
      </div>

      {/* Dispatch Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-card/50 border-b border-primary/20">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Rake ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Time
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Destination
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Wagons
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Utilization
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {dispatchData.map((entry, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-card/30 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono font-semibold text-primary">
                      {entry.rakeId}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{entry.time}</td>
                  <td className="px-6 py-4 text-sm">{entry.destination}</td>
                  <td className="px-6 py-4 text-sm">{entry.wagons}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            entry.utilization > 95
                              ? "bg-primary"
                              : entry.utilization > 90
                              ? "bg-secondary"
                              : "bg-yellow-500"
                          }`}
                          style={{ width: `${entry.utilization}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12">
                        {entry.utilization}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        entry.status === "on-time"
                          ? "bg-green-500/20 text-green-400"
                          : entry.status === "delayed"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {entry.status === "risk" && (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      {entry.status === "on-time"
                        ? "On Time"
                        : entry.status === "delayed"
                        ? "Delayed"
                        : "At Risk"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timeline View */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-6">Dispatch Timeline</h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30" />

          {/* Timeline items */}
          <div className="space-y-6">
            {dispatchData.map((entry, idx) => (
              <div key={idx} className="relative flex items-start gap-4 pl-4">
                {/* Timeline dot */}
                <div
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                    entry.status === "on-time"
                      ? "bg-green-500/20 border-2 border-green-400"
                      : entry.status === "delayed"
                      ? "bg-yellow-500/20 border-2 border-yellow-400"
                      : "bg-red-500/20 border-2 border-red-400 animate-pulse"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      entry.status === "on-time"
                        ? "bg-green-400"
                        : entry.status === "delayed"
                        ? "bg-yellow-400"
                        : "bg-red-400"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 glass-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-primary">
                      {entry.rakeId}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {entry.time}
                    </span>
                  </div>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="text-muted-foreground">
                        Destination:
                      </span>{" "}
                      {entry.destination}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Wagons:</span>{" "}
                      {entry.wagons} • {entry.utilization}% utilization
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
