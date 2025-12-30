import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Shield, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Guides = () => {
  const guideCategories = [
    {
      title: "Getting Started",
      icon: Zap,
      description: "Welcome to the JCC AI Hub Documentation. This hub is designed for Jacksonville Civic Council team members who want to understand, navigate, and make the most of our automation tools.",
      guides: [
        { name: "What is the Documentation Hub?", href: "/guides/intro" },
        { name: "Who is this for?", href: "/guides/audience" },
        { name: "How to navigate this hub", href: "/guides/navigation" },
      ]
    },
    {
      title: "Best Practices",
      icon: BookOpen,
      description: "High-level guidance to help you create clear, effective documentation and maintain consistency across your team.",
      guides: [
        { name: "Writing clear internal documentation", href: "/guides/clear-docs" },
        { name: "Maintaining consistency", href: "/guides/consistency" },
        { name: "Avoiding over-documentation", href: "/guides/minimal-docs" },
      ]
    },
    {
      title: "Security & Privacy",
      icon: Shield,
      description: "General reminders about handling information safely and maintaining access awareness within the organization.",
      guides: [
        { name: "Handling information safely", href: "/guides/safe-handling" },
        { name: "Access awareness", href: "/guides/access-awareness" },
      ]
    },
    {
      title: "Team Collaboration",
      icon: Users,
      description: "Practical guidance on working together, documenting shared processes, and keeping shared information organized.",
      guides: [
        { name: "Working together effectively", href: "/guides/teamwork" },
        { name: "Documenting shared processes", href: "/guides/shared-processes" },
        { name: "Keeping shared information organized", href: "/guides/organization" },
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
            Your guide to understanding and navigating the JCC AI Hub. Simple, clear, and designed for everyone on the team.
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
                <p className="text-sm text-muted-foreground mt-2">
                  {category.description}
                </p>
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
                <h3 className="text-xl font-semibold text-foreground mb-2">New to the AI Hub?</h3>
                <p className="text-muted-foreground mb-4">
                  Start with our Getting Started section to learn what this hub is, who it's for, and how to find what you need quickly.
                </p>
                <Link 
                  to="/guides/intro"
                  className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors font-medium"
                >
                  View Getting Started
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
