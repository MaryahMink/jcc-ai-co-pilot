import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Shield, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Guides = () => {
  const guideCategories = [
    {
      title: "Getting Started",
      icon: Zap,
      guides: [
        { name: "Setting Up Your First Workflow", href: "/guides/getting-started" },
        { name: "Understanding Automation Triggers", href: "/guides/triggers" },
        { name: "Connecting Your Tools", href: "/guides/integrations" },
      ]
    },
    {
      title: "Best Practices",
      icon: BookOpen,
      guides: [
        { name: "Crafting Effective AI Prompts", href: "/guides/prompting" },
        { name: "Optimizing Workflow Performance", href: "/guides/optimization" },
        { name: "Testing and Validation", href: "/guides/testing" },
      ]
    },
    {
      title: "Security & Privacy",
      icon: Shield,
      guides: [
        { name: "Data Safety & Privacy", href: "/guides/data-safety" },
        { name: "Managing Access Permissions", href: "/guides/permissions" },
        { name: "Audit Logs & Compliance", href: "/guides/compliance" },
      ]
    },
    {
      title: "Team Collaboration",
      icon: Users,
      guides: [
        { name: "Sharing Workflows with Team Members", href: "/guides/sharing" },
        { name: "Collaboration Best Practices", href: "/guides/collaboration" },
        { name: "Workflow Templates Library", href: "/guides/templates" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Documentation Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Comprehensive guides, best practices, and reference materials to help you make the most of JCC AI Hub automations.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          {guideCategories.map((category) => (
            <Card key={category.title} className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="w-5 h-5 text-primary" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.guides.map((guide) => (
                    <li key={guide.name}>
                      <Link 
                        to={guide.href}
                        className="text-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary group-hover:w-2 transition-all" />
                        {guide.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Guide */}
        <Card className="mt-8 shadow-card bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">New to AI Automation?</h3>
                <p className="text-muted-foreground mb-4">
                  Start with our comprehensive getting started guide to understand the basics of workflow automation, 
                  AI capabilities, and how to build your first automation in minutes.
                </p>
                <Link 
                  to="/guides/getting-started"
                  className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors font-medium"
                >
                  View Getting Started Guide
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Guides;
