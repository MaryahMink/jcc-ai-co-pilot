import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Mail, Calendar, MessageSquare, FileText, Users, Clock, Search, Sparkles } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  integrations: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  popular: boolean;
}

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const templates: Template[] = [
    {
      id: "email-auto-responder",
      name: "Email Auto-Responder",
      description: "Automatically respond to emails based on keywords and sender rules",
      category: "Messaging",
      icon: Mail,
      integrations: ["Gmail", "Google Calendar"],
      difficulty: "beginner",
      popular: true,
    },
    {
      id: "slack-standup-bot",
      name: "Slack Stand-up Bot",
      description: "Daily automated stand-up messages to keep your team synchronized",
      category: "Team Engagement",
      icon: MessageSquare,
      integrations: ["Slack"],
      difficulty: "beginner",
      popular: true,
    },
    {
      id: "calendar-meeting-prep",
      name: "Meeting Prep Assistant",
      description: "Auto-gather context and briefings before scheduled meetings",
      category: "Meeting Prep",
      icon: Calendar,
      integrations: ["Google Calendar", "Gmail", "Slack"],
      difficulty: "intermediate",
      popular: true,
    },
    {
      id: "asana-task-tracker",
      name: "Asana Task Tracker",
      description: "Track project progress and send weekly summaries to stakeholders",
      category: "Data Tracking",
      icon: FileText,
      integrations: ["Asana", "Slack"],
      difficulty: "intermediate",
      popular: false,
    },
    {
      id: "team-onboarding",
      name: "Team Onboarding Flow",
      description: "Automated welcome messages and resource sharing for new team members",
      category: "Team Engagement",
      icon: Users,
      integrations: ["Slack", "Gmail", "Asana"],
      difficulty: "advanced",
      popular: false,
    },
    {
      id: "scheduled-reminders",
      name: "Smart Reminders",
      description: "Context-aware reminders for tasks, deadlines, and follow-ups",
      category: "Scheduling",
      icon: Clock,
      integrations: ["Slack", "Google Calendar"],
      difficulty: "beginner",
      popular: true,
    },
  ];

  const categories = ["All", "Messaging", "Scheduling", "Team Engagement", "Data Tracking", "Meeting Prep"];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-accent/10 text-accent border-accent/20";
      case "intermediate":
        return "bg-primary/10 text-primary border-primary/20";
      case "advanced":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-layer">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-bold text-foreground">Workflow Templates</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Pre-built automation workflows to get you started in minutes
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card border-border text-foreground"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="bg-card border border-border">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Popular Templates Section */}
        {selectedCategory === "All" && searchQuery === "" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-accent" />
              Popular Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates
                .filter((t) => t.popular)
                .map((template) => {
                  const Icon = template.icon;
                  return (
                    <Card
                      key={template.id}
                      className="bg-gradient-teal-deep border-0 text-white shadow-elevated hover:shadow-glow transition-all duration-300 group"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                            <Icon className="w-6 h-6" />
                          </div>
                          <Badge className="bg-accent text-accent-foreground border-0">Popular</Badge>
                        </div>
                        <CardTitle className="text-xl">{template.name}</CardTitle>
                        <CardDescription className="text-white/80">
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {template.integrations.map((integration) => (
                              <Badge
                                key={integration}
                                variant="outline"
                                className="bg-white/5 text-white border-white/20"
                              >
                                {integration}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge className={getDifficultyColor(template.difficulty)}>
                              {template.difficulty}
                            </Badge>
                            <Link to={`/automations/${template.id}/setup`}>
                              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                                Use Template
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        )}

        {/* All Templates Grid */}
        <div>
          {selectedCategory !== "All" || searchQuery !== "" ? (
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {searchQuery
                ? `Search Results (${filteredTemplates.length})`
                : `${selectedCategory} Templates`}
            </h2>
          ) : (
            <h2 className="text-2xl font-bold text-foreground mb-6">All Templates</h2>
          )}
          
          {filteredTemplates.length === 0 ? (
            <Card className="bg-card border-border shadow-card">
              <CardContent className="py-12 text-center">
                <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                <p className="text-muted-foreground">No templates found matching your criteria</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <Card
                    key={template.id}
                    className="bg-card border-border shadow-card hover:shadow-card-hover transition-all duration-300 group"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary">
                          <Icon className="w-6 h-6" />
                        </div>
                        {template.popular && (
                          <Badge className="bg-accent/10 text-accent border-accent/20">Popular</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl text-foreground">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {template.integrations.map((integration) => (
                            <Badge
                              key={integration}
                              variant="outline"
                              className="border-border text-foreground"
                            >
                              {integration}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className={getDifficultyColor(template.difficulty)}>
                            {template.difficulty}
                          </Badge>
                          <Link to={`/automations/${template.id}/setup`}>
                            <Button variant="default" className="group-hover:bg-primary group-hover:text-primary-foreground">
                              Use Template
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Templates;
