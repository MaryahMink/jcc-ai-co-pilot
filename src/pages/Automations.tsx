import Navigation from "@/components/Navigation";
import AutomationWorkflowCard from "@/components/AutomationWorkflowCard";
import { Mail, MessageSquare, CheckSquare, Calendar, Inbox, Bell } from "lucide-react";

const workflowData = {
  gmailAutoResponder: {
    howItWorks: [
      "Incoming emails are automatically scanned for keywords, sentiment, and priority indicators.",
      "AI analyzes the content and categorizes the email based on predefined rules.",
      "Appropriate response templates are selected or AI generates contextual replies.",
      "Responses are sent automatically or queued for review based on confidence levels.",
    ],
    valueProposition: [
      "Reduces email response time from hours to seconds for routine inquiries.",
      "Ensures consistent, professional communication across all team members.",
      "Frees up staff time for higher-priority civic engagement activities.",
      "Maintains 24/7 responsiveness to citizen inquiries.",
    ],
    webhookUrl: "https://myvillageproject.app.n8n.cloud/webhook/JCC-Email",
  },
  calendarSync: {
    howItWorks: [
      "Monitors all connected calendars for new events and scheduling requests.",
      "Automatically detects conflicts and suggests optimal meeting times.",
      "Sends reminders and follow-ups based on configurable rules.",
      "Syncs changes across all platforms in real-time.",
    ],
    valueProposition: [
      "Eliminates double-booking and scheduling conflicts.",
      "Reduces time spent on manual calendar coordination by up to 80%.",
      "Ensures all stakeholders are informed of schedule changes instantly.",
      "Improves meeting attendance and preparation rates.",
    ],
    webhookUrl: "https://efuller.app.n8n.cloud/webhook/18680451-dfdf-4c25-a745-e77c92bbb5a9",
  },
  teamReminder: {
    howItWorks: [
      "Scheduled reminders are configured with specific channels, times, and messages.",
      "The workflow triggers at designated intervals (daily, weekly, or custom).",
      "Messages are delivered to team channels or individual members via Slack.",
      "Acknowledgment tracking ensures important reminders are seen and acted upon.",
    ],
    valueProposition: [
      "Promotes team consistency by ensuring everyone receives the same information.",
      "Reinforces accountability through regular check-ins and deadline reminders.",
      "Supports daily operational routines without manual intervention.",
      "Reduces missed deadlines and forgotten tasks across teams.",
    ],
    createdBy: "Darnell",
  },
  dailyDigest: {
    howItWorks: [
      "Aggregates activity from selected Slack channels over a 24-hour period.",
      "AI summarizes key discussions, decisions, and action items.",
      "Compiles mentions, reactions, and thread highlights into a digestible format.",
      "Delivers the summary to designated channels or individuals at scheduled times.",
    ],
    valueProposition: [
      "Keeps team members informed without requiring them to read every message.",
      "Improves daily knowledge flow and reduces information silos.",
      "Highlights important decisions and action items that might otherwise be missed.",
      "Saves hours of catch-up time for team members who were unavailable.",
    ],
    webhookUrl: "https://myvillageproject.app.n8n.cloud/webhook/b5fc872f-863e-40d1-9d94-59206ad502de",
  },
  asanaTaskCreation: {
    howItWorks: [
      "Monitors email, Slack, and calendar for actionable items.",
      "AI identifies tasks and extracts relevant details (assignee, due date, priority).",
      "Tasks are automatically created in the appropriate Asana project.",
      "Notifications are sent to assignees with full context and links.",
    ],
    valueProposition: [
      "Eliminates manual task entry and reduces data entry errors.",
      "Ensures no action items fall through the cracks.",
      "Accelerates task movement from identification to assignment.",
      "Provides consistent task formatting and categorization.",
    ],
    webhookUrl: "https://myvillageproject.app.n8n.cloud/webhook/AsanaGET",
  },
};

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
            Access all your automated workflows in one place. Each card leads to
            detailed setup guides, configuration options, and live status
            monitoring.
          </p>
        </section>

        {/* Email & Calendar Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Mail className="w-6 h-6 text-primary" />
            Email & Calendar Automation
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <AutomationWorkflowCard
              title="Gmail Auto-Responder"
              description="Intelligent email responses based on sentiment analysis, keywords, and priority rules."
              icon={Inbox}
              workflowDetails={workflowData.gmailAutoResponder}
            />
            <AutomationWorkflowCard
              title="Calendar Sync & Scheduling"
              description="Automated meeting scheduling, conflict detection, and calendar event management."
              icon={Calendar}
              workflowDetails={workflowData.calendarSync}
            />
          </div>
        </section>

        {/* Slack Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-accent" />
            Slack Reminder Workflow/Automations
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <AutomationWorkflowCard
              title="Team Reminder Workflow"
              description="Schedule and send automated reminders to team channels or individuals at specified intervals."
              icon={Bell}
              iconColor="text-accent"
              workflowDetails={workflowData.teamReminder}
            />
            <AutomationWorkflowCard
              title="Daily Digest Agent"
              description="Compile and distribute daily summaries of channel activity, mentions, and action items."
              icon={MessageSquare}
              iconColor="text-accent"
              workflowDetails={workflowData.dailyDigest}
            />
          </div>
        </section>

        {/* Asana Section */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-primary-dark" />
            Asana Workflow/Automation
            <span className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground font-normal">
              Coming Soon
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <AutomationWorkflowCard
              title="Task Auto-Creation"
              description="Automatically create Asana tasks from emails, Slack messages, or calendar events."
              icon={CheckSquare}
              iconColor="text-primary-dark"
              comingSoon
              workflowDetails={workflowData.asanaTaskCreation}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Automations;
