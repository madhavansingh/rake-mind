import KPICard from "@/components/KPICard";
import {
  Package,
  Train,
  TrendingUp,
  DollarSign,
  Activity,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock data
const ordersData = [
  { month: "Jan", orders: 145, fulfilled: 138 },
  { month: "Feb", orders: 168, fulfilled: 162 },
  { month: "Mar", orders: 182, fulfilled: 179 },
  { month: "Apr", orders: 201, fulfilled: 198 },
  { month: "May", orders: 225, fulfilled: 223 },
  { month: "Jun", orders: 248, fulfilled: 246 },
];

const costSavingsData = [
  { month: "Jan", savings: 125000 },
  { month: "Feb", savings: 142000 },
  { month: "Mar", savings: 168000 },
  { month: "Apr", savings: 195000 },
  { month: "May", savings: 218000 },
  { month: "Jun", savings: 245000 },
];

const utilizationData = [
  { day: "Mon", manual: 72, ai: 94 },
  { day: "Tue", manual: 68, ai: 96 },
  { day: "Wed", manual: 75, ai: 93 },
  { day: "Thu", manual: 71, ai: 95 },
  { day: "Fri", manual: 69, ai: 97 },
  { day: "Sat", manual: 74, ai: 96 },
  { day: "Sun", manual: 70, ai: 94 },
];

const Dashboard = () => {
  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Command Center
          </h1>
          <p className="text-muted-foreground">
            Real-time insights into rake formation operations
          </p>
        </div>
        <div className="glass-card px-4 py-2 rounded-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">System Online</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Orders Pending"
          value={42}
          subtitle="Awaiting rake assignment"
          icon={Package}
          trend={{ value: "12%", positive: false }}
          color="cyan"
        />
        <KPICard
          title="Rakes Formed Today"
          value={18}
          subtitle="Out of 20 planned"
          icon={Train}
          trend={{ value: "8%", positive: true }}
          color="orange"
        />
        <KPICard
          title="Wagon Utilization"
          value="96.4%"
          subtitle="AI-optimized allocation"
          icon={TrendingUp}
          trend={{ value: "24%", positive: true }}
          color="cyan"
        />
        <KPICard
          title="Cost Savings"
          value="₹2.45L"
          subtitle="vs manual planning"
          icon={DollarSign}
          trend={{ value: "18%", positive: true }}
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Fulfillment Chart */}
        <div className="glass-card p-6 rounded-xl glow-border-cyan">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Order Fulfillment Trends</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="hsl(var(--secondary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--secondary))", r: 4 }}
                name="Total Orders"
              />
              <Line
                type="monotone"
                dataKey="fulfilled"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
                name="Fulfilled"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cost Savings Chart */}
        <div className="glass-card p-6 rounded-xl glow-border-orange">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-secondary" />
            <h3 className="text-lg font-semibold">Cumulative Cost Savings</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={costSavingsData}>
              <defs>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--secondary))"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--secondary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => `₹${(value / 1000).toFixed(0)}K`}
              />
              <Area
                type="monotone"
                dataKey="savings"
                stroke="hsl(var(--secondary))"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSavings)"
                name="Savings (₹)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Utilization Comparison */}
        <div className="glass-card p-6 rounded-xl glow-border-cyan lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">
              Wagon Utilization: AI vs Manual Planning
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={utilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="day"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => `${value}%`}
              />
              <Legend />
              <Bar
                dataKey="manual"
                fill="hsl(var(--muted))"
                radius={[8, 8, 0, 0]}
                name="Manual Planning"
              />
              <Bar
                dataKey="ai"
                fill="hsl(var(--primary))"
                radius={[8, 8, 0, 0]}
                name="AI Planning"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Recent Dispatch Activity</h3>
        <div className="space-y-3">
          {[
            {
              time: "2 min ago",
              action: "Rake R-2401 dispatched",
              status: "success",
            },
            {
              time: "15 min ago",
              action: "Order batch assigned to Rake R-2402",
              status: "info",
            },
            {
              time: "32 min ago",
              action: "AI optimization completed for Stockyard B",
              status: "success",
            },
            {
              time: "1 hour ago",
              action: "Wagon maintenance alert for unit W-8845",
              status: "warning",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-3 rounded-lg bg-card/30 hover:bg-card/50 transition-colors"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  item.status === "success"
                    ? "bg-green-400"
                    : item.status === "warning"
                    ? "bg-yellow-400"
                    : "bg-blue-400"
                } animate-pulse`}
              />
              <div className="flex-1">
                <p className="text-sm text-foreground">{item.action}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
