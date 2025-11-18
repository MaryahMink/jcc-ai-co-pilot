import Navigation from "@/components/Navigation";
import WorkflowCard from "@/components/WorkflowCard";
import RecentUpdate from "@/components/RecentUpdate";
import { Mail, MessageSquare, CheckSquare } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 bg-gradient-teal-atmospheric pointer-events-none" />
      
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <section className="mb-20 text-center max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-semibold text-primary">AI Command Center</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
            Your Digital <span className="bg-gradient-teal bg-clip-text text-transparent">Co-Pilot</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Navigate automations, tools, and best-practice guidance with clarity and confidence. 
            A streamlined command center for Jacksonville Civic Council operations.
          </p>
        </section>

        {/* Quick Access Cards */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-12 bg-gradient-teal rounded-full" />
            <h2 className="text-3xl font-bold text-foreground">Quick Access</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <WorkflowCard
              title="Email & Calendar"
              description="Automate Gmail responses, calendar scheduling, and meeting reminders with AI-powered workflows."
              icon={Mail}
              to="/automations/email-calendar"
            />
            <WorkflowCard
              title="Slack Reminders"
              description="Set up intelligent Slack agents to manage team reminders, notifications, and updates."
              icon={MessageSquare}
              iconColor="text-accent"
              to="/automations/slack"
            />
            <WorkflowCard
              title="Asana Workflows"
              description="Streamline project management with automated task creation, updates, and tracking."
              icon={CheckSquare}
              iconColor="text-primary-dark"
              to="/automations/asana"
              comingSoon
            />
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Recently Updated */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-gradient-accent rounded-full" />
              <h2 className="text-3xl font-bold text-foreground">Recently Updated</h2>
            </div>
            <div className="space-y-4">
              <RecentUpdate
                title="Gmail Auto-Response Enhancement"
                description="Added sentiment analysis and priority routing for incoming member inquiries."
                date="2 days ago"
                category="Email"
                to="/automations/email-calendar"
              />
              <RecentUpdate
                title="Slack Daily Digest Agent"
                description="New workflow for automated daily summaries of channel activity and action items."
                date="1 week ago"
                category="Slack"
                to="/automations/slack"
              />
              <RecentUpdate
                title="Calendar Conflict Resolution"
                description="Improved AI logic for detecting and resolving meeting scheduling conflicts."
                date="2 weeks ago"
                category="Calendar"
                to="/automations/email-calendar"
              />
            </div>
          </section>

          {/* Recommended Guides */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-gradient-teal-deep rounded-full" />
              <h2 className="text-3xl font-bold text-foreground">Recommended Guides</h2>
            </div>
            <div className="space-y-4">
              <RecentUpdate
                title="Best Practices for AI Prompts"
                description="Learn how to craft effective prompts for accurate, context-aware automation responses."
                date="Updated 3 days ago"
                category="Guide"
                to="/guides/prompting"
              />
              <RecentUpdate
                title="Data Safety & Privacy"
                description="Understanding how your data is handled, stored, and protected in automated workflows."
                date="Updated 1 week ago"
                category="Guide"
                to="/guides/data-safety"
              />
              <RecentUpdate
                title="Setting Up Your First Workflow"
                description="Step-by-step walkthrough for creating and deploying your first automation."
                date="Updated 2 weeks ago"
                category="Guide"
                to="/guides/getting-started"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
