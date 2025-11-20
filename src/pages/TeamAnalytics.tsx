import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Workflow, Activity, TrendingUp } from 'lucide-react';

const TeamAnalytics = () => {
  const navigate = useNavigate();

  const teamStats = {
    totalWorkflows: 24,
    activeWorkflows: 18,
    teamMembers: 12,
    executions: 1247,
  };

  const workflows = [
    { id: 1, name: 'Permit Application Processor', owner: 'Sarah Chen', executions: 342, status: 'active' },
    { id: 2, name: 'License Renewal Alert', owner: 'Mike Torres', executions: 256, status: 'active' },
    { id: 3, name: 'Inspection Scheduler', owner: 'Lisa Wang', executions: 189, status: 'active' },
    { id: 4, name: 'Complaint Handler', owner: 'David Kim', executions: 147, status: 'paused' },
  ];

  const topCollaborators = [
    { name: 'Sarah Chen', workflows: 8, contributions: 45 },
    { name: 'Mike Torres', workflows: 6, contributions: 38 },
    { name: 'Lisa Wang', workflows: 5, contributions: 31 },
    { name: 'David Kim', workflows: 5, contributions: 27 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/automations')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-4xl font-bold">Team Analytics</h1>
            <p className="text-muted-foreground mt-2">Collaboration insights and workflow metrics</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary to-teal-medium text-white border-0">
            <CardHeader className="pb-3">
              <Workflow className="w-8 h-8 mb-2 opacity-80" />
              <CardTitle className="text-2xl">{teamStats.totalWorkflows}</CardTitle>
              <CardDescription className="text-white/80">Total Workflows</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-accent to-accent/80 text-white border-0">
            <CardHeader className="pb-3">
              <Activity className="w-8 h-8 mb-2 opacity-80" />
              <CardTitle className="text-2xl">{teamStats.activeWorkflows}</CardTitle>
              <CardDescription className="text-white/80">Active Workflows</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-primary-dark to-primary text-white border-0">
            <CardHeader className="pb-3">
              <Users className="w-8 h-8 mb-2 opacity-80" />
              <CardTitle className="text-2xl">{teamStats.teamMembers}</CardTitle>
              <CardDescription className="text-white/80">Team Members</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-teal-medium to-primary text-white border-0">
            <CardHeader className="pb-3">
              <TrendingUp className="w-8 h-8 mb-2 opacity-80" />
              <CardTitle className="text-2xl">{teamStats.executions}</CardTitle>
              <CardDescription className="text-white/80">Total Executions</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Workflow Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Workflow Performance</CardTitle>
              <CardDescription>Most executed workflows this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div key={workflow.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold">{workflow.name}</h4>
                      <p className="text-sm text-muted-foreground">Owner: {workflow.owner}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-semibold">{workflow.executions}</p>
                        <p className="text-xs text-muted-foreground">executions</p>
                      </div>
                      <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                        {workflow.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Collaborators */}
          <Card>
            <CardHeader>
              <CardTitle>Top Collaborators</CardTitle>
              <CardDescription>Most active team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCollaborators.map((collaborator, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                        {collaborator.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold">{collaborator.name}</h4>
                        <p className="text-sm text-muted-foreground">{collaborator.workflows} workflows</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary">{collaborator.contributions}</p>
                      <p className="text-xs text-muted-foreground">contributions</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamAnalytics;
