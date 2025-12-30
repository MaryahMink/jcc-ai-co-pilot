import Navigation from "@/components/Navigation";
import HomeWorkflowCard from "@/components/HomeWorkflowCard";
import GuideCard from "@/components/GuideCard";
import { Mail, MessageSquare, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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

const Home = () => {
  const quickAccessAnim = useScrollAnimation();
  const guidesAnim = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navigation />
      
      {/* Hero Section - Deep Teal with Gradient */}
      <section className="relative bg-gradient-hero overflow-hidden">
        {/* Atmospheric Overlay */}
        <div className="absolute inset-0 bg-gradient-hero-overlay opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(180_60%_31%_/_0.3),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(162_100%_45%_/_0.1),_transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-tight">
              A modern toolkit for a forward-moving <span className="text-accent">Jacksonville.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
              Your AI command center — built for clarity, speed, and impact.
            </p>
            <Link to="/automations">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold text-lg px-10 py-6 h-auto rounded-2xl shadow-glow hover:shadow-elevated hover:scale-105 transition-all duration-300">
                Explore Automations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content - Layered Gray Background */}
      <main className="relative bg-gradient-layer">
        {/* Quick Access Section */}
        <section ref={quickAccessAnim.ref} className={`container mx-auto px-4 py-16 relative z-10 scroll-fade-in ${quickAccessAnim.isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12">Quick Access</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <HomeWorkflowCard 
              title="Gmail Auto-Responder" 
              description="Automate Gmail responses with AI-powered intelligent email workflows." 
              icon={Mail} 
              workflowDetails={workflowData.gmailAutoResponder}
            />
            <HomeWorkflowCard 
              title="Daily Digest Agent" 
              description="Compile and distribute daily summaries of channel activity, mentions, and action items." 
              icon={MessageSquare} 
              iconColor="text-accent"
              workflowDetails={workflowData.dailyDigest}
            />
            <HomeWorkflowCard 
              title="Asana Workflow Automation" 
              description="Streamline project management with automated task creation, updates, and tracking." 
              icon={CheckSquare} 
              iconColor="text-primary"
              workflowDetails={workflowData.asanaTaskCreation}
            />
          </div>
        </section>

        {/* Centered Guides Section */}
        <section className="bg-layer-1 py-16">
          <div className="container mx-auto px-4">
            <div ref={guidesAnim.ref} className={`max-w-2xl mx-auto scroll-fade-in ${guidesAnim.isVisible ? 'visible' : ''}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">Recommended Guides</h2>
              <div className="space-y-5">
                <GuideCard 
                  title="Best Practices for AI Prompts" 
                  description="Learn how to craft effective prompts for accurate, context-aware automation responses." 
                  to="/guides/prompting" 
                />
                <GuideCard 
                  title="Data Safety & Privacy" 
                  description="Understanding how your data is handled, stored, and protected in automated workflows." 
                  to="/guides/data-safety" 
                />
                <GuideCard 
                  title="Setting Up Your First Workflow" 
                  description="Step-by-step walkthrough for creating and deploying your first automation." 
                  to="/guides/getting-started" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Layer for Depth */}
        <section className="bg-layer-2 py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 Jacksonville Civic Council. Built for civic innovation.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
