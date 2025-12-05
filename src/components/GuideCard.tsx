import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface GuideCardProps {
  title: string;
  description: string;
  to: string;
}

const GuideCard = ({ title, description, to }: GuideCardProps) => {
  return (
    <Link to={to} className="group">
      <Card className="bg-card shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 relative overflow-hidden border border-border/50">
        <div className="absolute inset-0 bg-gradient-teal-atmospheric opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardContent className="p-7 relative z-10">
          <h4 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors mb-3">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GuideCard;
