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
      className={`block ${!comingSoon && 'cursor-pointer group'}`}
    >
      <Card className={`h-full bg-gradient-card shadow-card transition-all duration-300 relative overflow-hidden ${
        !comingSoon && 'hover:shadow-glow hover:-translate-y-2'
      } ${comingSoon && 'opacity-60'}`}>
        {/* Hover Glow Effect */}
        {!comingSoon && (
          <div className="absolute inset-0 bg-gradient-teal opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
        )}
        
        <CardContent className="p-8 relative z-10">
          <div className="flex items-start gap-5">
            <div className={`p-4 rounded-2xl bg-primary/10 ${iconColor} transition-all duration-300 ${
              !comingSoon && 'group-hover:scale-110 group-hover:shadow-glow'
            }`}>
              <Icon className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-bold text-xl text-foreground">{title}</h3>
                {comingSoon && (
                  <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
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
