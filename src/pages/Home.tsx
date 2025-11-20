import Navigation from "@/components/Navigation";
import WorkflowCard from "@/components/WorkflowCard";
import RecentUpdate from "@/components/RecentUpdate";
import { Mail, MessageSquare, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Home = () => {
  const quickAccessAnim = useScrollAnimation();
  const recentUpdatesAnim = useScrollAnimation();
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
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white font-bold text-lg px-10 py-6 h-auto rounded-2xl shadow-glow hover:shadow-elevated hover:scale-105 transition-all duration-300"
              >
                Explore Automations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content - Layered Gray Background */}
      <main className="relative bg-gradient-layer">
        {/* Quick Access Section */}
        <section 
          ref={quickAccessAnim.ref}
          className={`container mx-auto px-4 py-16 relative z-10 scroll-fade-in ${quickAccessAnim.isVisible ? 'visible' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12">Quick Access</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <WorkflowCard
              title="Gmail & Calendar Automation"
              description="Automate Gmail responses, calendar scheduling, and meeting reminders with AI-powered workflows."
              icon={Mail}
              to="/automations/email-calendar"
            />
            <WorkflowCard
              title="Slack Reminder Agent"
              description="Set up intelligent Slack agents to manage team reminders, notifications, and updates."
              icon={MessageSquare}
              iconColor="text-accent"
              to="/automations/slack"
            />
            <WorkflowCard
              title="Asana Workflow Automation"
              description="Streamline project management with automated task creation, updates, and tracking."
              icon={CheckSquare}
              iconColor="text-primary"
              to="/automations/asana"
              comingSoon
            />
          </div>
        </section>

        {/* Two Column Layout - Cascading Panels */}
        <section className="bg-layer-1 py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Recently Updated */}
              <div 
                ref={recentUpdatesAnim.ref}
                className={`scroll-slide-left ${recentUpdatesAnim.isVisible ? 'visible' : ''}`}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">Recently Updated Workflows</h2>
                <div className="space-y-5">
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
              </div>

              {/* Recommended Guides */}
              <div 
                ref={guidesAnim.ref}
                className={`scroll-slide-right ${guidesAnim.isVisible ? 'visible' : ''}`}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">Recommended Guides</h2>
                <div className="space-y-5">
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
