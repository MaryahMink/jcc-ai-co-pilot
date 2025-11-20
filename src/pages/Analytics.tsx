import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Activity, CheckCircle, AlertCircle, Clock } from "lucide-react";

const Analytics = () => {
  // Sample data for charts
  const workflowData = [
    { name: "Mon", completed: 24, failed: 2 },
    { name: "Tue", completed: 31, failed: 1 },
    { name: "Wed", completed: 28, failed: 3 },
    { name: "Thu", completed: 35, failed: 1 },
    { name: "Fri", completed: 42, failed: 2 },
    { name: "Sat", completed: 18, failed: 1 },
    { name: "Sun", completed: 15, failed: 0 },
  ];

  const integrationData = [
    { name: "Gmail", value: 450, color: "hsl(var(--primary))" },
    { name: "Slack", value: 320, color: "hsl(var(--accent))" },
    { name: "Calendar", value: 280, color: "hsl(var(--teal-medium))" },
    { name: "Asana", value: 190, color: "hsl(var(--success))" },
  ];

  const performanceData = [
    { month: "Jan", efficiency: 85 },
    { month: "Feb", efficiency: 88 },
    { month: "Mar", efficiency: 92 },
    { month: "Apr", efficiency: 90 },
    { month: "May", efficiency: 94 },
    { month: "Jun", efficiency: 96 },
  ];

  const stats = [
    {
      title: "Total Workflows",
      value: "193",
      change: "+12%",
      trend: "up",
      icon: Activity,
      color: "text-primary",
    },
    {
      title: "Success Rate",
      value: "96.2%",
      change: "+2.4%",
      trend: "up",
      icon: CheckCircle,
      color: "text-accent",
    },
    {
      title: "Active Integrations",
      value: "8",
      change: "+2",
      trend: "up",
      icon: TrendingUp,
      color: "text-teal-medium",
    },
    {
      title: "Avg. Response Time",
      value: "1.2s",
      change: "-0.3s",
      trend: "down",
      icon: Clock,
      color: "text-success",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-layer">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor workflow performance and automation metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
            return (
              <Card key={index} className="bg-card border-border shadow-card hover:shadow-card-hover transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription className="text-xs font-medium uppercase tracking-wider">
                      {stat.title}
                    </CardDescription>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                    <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === "up" ? "text-accent" : "text-success"}`}>
                      <TrendIcon className="w-4 h-4" />
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="workflows" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="workflows">Workflow Activity</TabsTrigger>
            <TabsTrigger value="integrations">Integration Usage</TabsTrigger>
            <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-6">
            <Card className="bg-card border-border shadow-card">
              <CardHeader>
                <CardTitle>Weekly Workflow Execution</CardTitle>
                <CardDescription>Completed vs Failed workflows over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={workflowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="completed" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="failed" fill="hsl(var(--destructive))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card className="bg-card border-border shadow-card">
              <CardHeader>
                <CardTitle>Integration Activity Distribution</CardTitle>
                <CardDescription>Total actions processed by each integration</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={integrationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {integrationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-card border-border shadow-card">
              <CardHeader>
                <CardTitle>System Efficiency Over Time</CardTitle>
                <CardDescription>Monthly automation efficiency percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" domain={[80, 100]} />
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
                      dataKey="efficiency"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--accent))", r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Activity */}
        <Card className="mt-8 bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest workflow executions and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Email Auto-Responder", status: "completed", time: "2 min ago", integration: "Gmail" },
                { name: "Slack Daily Summary", status: "completed", time: "15 min ago", integration: "Slack" },
                { name: "Calendar Event Sync", status: "completed", time: "1 hour ago", integration: "Google Calendar" },
                { name: "Asana Task Update", status: "failed", time: "2 hours ago", integration: "Asana" },
                { name: "Meeting Reminder", status: "completed", time: "3 hours ago", integration: "Slack" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-background-layer-1 border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    {activity.status === "completed" ? (
                      <CheckCircle className="w-5 h-5 text-accent" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    )}
                    <div>
                      <p className="font-semibold text-foreground">{activity.name}</p>
                      <p className="text-sm text-muted-foreground">{activity.integration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
