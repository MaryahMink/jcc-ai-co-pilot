import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntegrationCardProps {
  name: string;
  icon: LucideIcon;
  status: "connected" | "not-connected" | "reconnect-needed";
  description: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

const IntegrationCard = ({
  name,
  icon: Icon,
  status,
  description,
  onConnect,
  onDisconnect,
}: IntegrationCardProps) => {
  const statusConfig = {
    connected: {
      badge: "Connected",
      badgeClass: "bg-success text-success-foreground",
      glowClass: "ring-2 ring-success/30 shadow-[0_0_20px_rgba(0,230,165,0.3)]",
      buttonText: "Disconnect",
      buttonAction: onDisconnect,
      buttonVariant: "outline" as const,
    },
    "not-connected": {
      badge: "Not Connected",
      badgeClass: "bg-muted text-muted-foreground",
      glowClass: "",
      buttonText: "Connect",
      buttonAction: onConnect,
      buttonVariant: "default" as const,
    },
    "reconnect-needed": {
      badge: "Reconnect Needed",
      badgeClass: "bg-destructive text-destructive-foreground",
      glowClass: "ring-2 ring-destructive/30",
      buttonText: "Reconnect",
      buttonAction: onConnect,
      buttonVariant: "default" as const,
    },
  };

  const config = statusConfig[status];

  return (
    <Card
      className={cn(
        "group hover:shadow-elevated transition-all duration-300 hover:scale-[1.02]",
        config.glowClass
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-foreground text-lg">{name}</h3>
              <Badge className={config.badgeClass}>{config.badge}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <Button
              onClick={config.buttonAction}
              variant={config.buttonVariant}
              size="sm"
              className="w-full"
            >
              {config.buttonText}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationCard;
