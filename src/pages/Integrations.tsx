import { useState } from "react";
import Navigation from "@/components/Navigation";
import IntegrationCard from "@/components/IntegrationCard";
import { Mail, Calendar, MessageSquare, CheckSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type IntegrationStatus = "connected" | "not-connected" | "reconnect-needed";

interface Integration {
  id: string;
  name: string;
  icon: typeof Mail;
  status: IntegrationStatus;
  description: string;
}

const Integrations = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "gmail",
      name: "Gmail",
      icon: Mail,
      status: "not-connected",
      description: "Connect your Gmail account to automate email responses and monitoring.",
    },
    {
      id: "google-calendar",
      name: "Google Calendar",
      icon: Calendar,
      status: "not-connected",
      description: "Sync calendars and automate meeting scheduling.",
    },
    {
      id: "slack",
      name: "Slack",
      icon: MessageSquare,
      status: "not-connected",
      description: "Send automated reminders and notifications to your workspace.",
    },
    {
      id: "asana",
      name: "Asana",
      icon: CheckSquare,
      status: "not-connected",
      description: "Create and manage tasks automatically from various sources.",
    },
  ]);

  const handleConnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === id ? { ...int, status: "connected" as IntegrationStatus } : int
      )
    );
    const integration = integrations.find((i) => i.id === id);
    toast({
      title: "Integration Connected",
      description: `Successfully connected to ${integration?.name}`,
    });
  };

  const handleDisconnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === id ? { ...int, status: "not-connected" as IntegrationStatus } : int
      )
    );
    const integration = integrations.find((i) => i.id === id);
    toast({
      title: "Integration Disconnected",
      description: `Disconnected from ${integration?.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Connected Apps
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Connect your favorite tools and services to enable powerful workflow automations. 
            All integrations use secure OAuth or API key authentication.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          {integrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              name={integration.name}
              icon={integration.icon}
              status={integration.status}
              description={integration.description}
              onConnect={() => handleConnect(integration.id)}
              onDisconnect={() => handleDisconnect(integration.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Integrations;
