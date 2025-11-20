import Navigation from "@/components/Navigation";
import WorkflowCard from "@/components/WorkflowCard";
import { Mail, MessageSquare, CheckSquare, Calendar, Inbox, Bell } from "lucide-react";

const Automations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Automation Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Access all your automated workflows in one place. Each card leads to detailed setup guides, 
            configuration options, and live status monitoring.
          </p>
        </section>

        {/* Email & Calendar Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Mail className="w-6 h-6 text-primary" />
            Email & Calendar Automation
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <WorkflowCard
              title="Gmail Auto-Responder"
              description="Intelligent email responses based on sentiment analysis, keywords, and priority rules."
              icon={Inbox}
              to="/automations/gmail-auto-responder/setup"
            />
            <WorkflowCard
              title="Calendar Sync & Scheduling"
              description="Automated meeting scheduling, conflict detection, and calendar event management."
              icon={Calendar}
              to="/automations/email-calendar"
            />
          </div>
        </section>

        {/* Slack Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-accent" />
            Slack Reminder Agents
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <WorkflowCard
              title="Team Reminder Bot"
              description="Schedule and send automated reminders to team channels or individuals at specified intervals."
              icon={Bell}
              iconColor="text-accent"
              to="/automations/slack"
            />
            <WorkflowCard
              title="Daily Digest Agent"
              description="Compile and distribute daily summaries of channel activity, mentions, and action items."
              icon={MessageSquare}
              iconColor="text-accent"
              to="/automations/slack"
            />
          </div>
        </section>

        {/* Asana Section */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-primary-dark" />
            Asana Workflow Tools
            <span className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground font-normal">
              Coming Soon
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <WorkflowCard
              title="Task Auto-Creation"
              description="Automatically create Asana tasks from emails, Slack messages, or calendar events."
              icon={CheckSquare}
              iconColor="text-primary-dark"
              to="/automations/asana"
              comingSoon
            />
            <WorkflowCard
              title="Project Status Updates"
              description="Generate and share automated project status reports based on task completion rates."
              icon={CheckSquare}
              iconColor="text-primary-dark"
              to="/automations/asana"
              comingSoon
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Automations;
