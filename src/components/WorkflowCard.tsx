import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface WorkflowCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  to: string;
  comingSoon?: boolean;
}

const WorkflowCard = ({ 
  title, 
  description, 
  icon: Icon, 
  iconColor = "text-primary",
  to,
  comingSoon = false 
}: WorkflowCardProps) => {
  const CardWrapper = comingSoon ? "div" : Link;
  
  return (
    <CardWrapper 
      to={comingSoon ? undefined : to}
      className={`block ${!comingSoon && 'cursor-pointer'}`}
    >
      <Card className={`h-full shadow-card hover:shadow-card-hover transition-all duration-200 ${
        !comingSoon && 'hover:-translate-y-1'
      } ${comingSoon && 'opacity-60'}`}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg bg-primary/10 ${iconColor}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg text-foreground">{title}</h3>
                {comingSoon && (
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  );
};

export default WorkflowCard;
